import { db } from '$lib/database';
import { join } from '$lib/database/helpers/joins.js';
import { exists, relationships, validateRelationship } from '$lib/database/helpers/validations';
import { selectFromFields } from '$lib/database/schemas.js';
import { json } from '@sveltejs/kit';

export const GET = async ({ params, url, locals: { $t } }) => {
	const id = parseInt(params.id, 10);
	await exists({ table: 'Product', id, $t });

	let query = db.selectFrom('Product');
	const productFields = url.searchParams.get(`fields[${relationships.enum.products}]`);
	const select = selectFromFields<'Product'>({ $t, fields: productFields, entity: 'Product' });
	query = select?.length ? query.select(select) : query.selectAll();

	const include = url.searchParams.get('include');
	const relations = validateRelationship({
		$t,
		allowedRelationships: ['images', 'attributes', 'departments', 'categories', 'subcategories'],
		include
	});

	if (relations?.length) {
		relations.forEach((relation) => {
			if (relation === 'departments')
				query = query.select((eb) => [join.Product.with.Department(eb)]);

			if (relation === 'categories') query = query.select((eb) => [join.Product.with.Category(eb)]);

			if (relation === 'subcategories')
				query = query.select((eb) => [join.Product.with.SubCategory(eb)]);

			if (relation === 'images') query = query.select((eb) => [join.Product.with.Image(eb)]);

			if (relation === 'attributes')
				query = query.select((eb) => [join.Product.with.ProductAttributeList(eb)]);
		});
	}

	const [data] = await query.where('id', '=', id).execute();

	return json({ data });
};

export const DELETE = async ({ params, locals: { $t } }) => {
	const id = parseInt(params.id, 10);
	await exists({ table: 'Product', id, $t });

	const [r] = await db.deleteFrom('Product').where('id', '=', id).execute();

	return json({ suceded: r.numDeletedRows > 0 });
};

export const PUT = async ({ params, request, locals: { $t, schemas } }) => {
	const id = parseInt(params.id, 10);
	await exists({ table: 'Product', id, $t });

	const body = schemas.product.partial().parse(await request.json());

	const [r] = await db.updateTable('Product').set(body).where('id', '=', id).execute();

	return json({ suceded: r.numUpdatedRows > 0 });
};
