import type { GetProductsAttributeResponse } from '$lib/api/types.js';
import { db } from '$lib/database';
import { join } from '$lib/database/helpers/joins.js';
import { extractPaginationParams, paginate } from '$lib/database/helpers/pagination.js';
import { validateRelationship } from '$lib/database/helpers/validations.js';
import { json } from '@sveltejs/kit';

export const GET = async ({ url, locals: { $t } }) => {
	const search = url.searchParams.get('search');
	const all = Boolean(url.searchParams.get('all'));

	let query = db.selectFrom('ProductsAttribute').selectAll();
	if (search) query = query.where('ProductsAttribute.name', 'like', `%${search}%`);

	const include = url.searchParams.get('include')?.split(',');
	const relations = validateRelationship({
		$t,
		allowedRelationships: ['values'],
		include
	});
	if (relations?.length) {
		relations.forEach((relation) => {
			if (relation === 'values')
				query = query.select((eb) => [join.ProductsAttribute.with.ProductsAttributeValue(eb)]);
		});
	}

	if (all) {
		const data = await query.execute();

		return json({
			data,
			meta: {
				beforeCursor: undefined,
				afterCursor: undefined,
				hasMore: false,
				total: data.length
			}
		} satisfies GetProductsAttributeResponse);
	}

	const { after, before, size } = extractPaginationParams(url);
	const [[{ count }], paginated] = await Promise.all([
		db
			.selectFrom('ProductsAttribute')
			.select((eb) => eb.fn.countAll().as('count'))
			.execute(),
		paginate(query, {
			after,
			before,
			perPage: size,
			fields: [{ expression: 'id', direction: 'asc' }],
			parseCursor: (cursor) => ({ id: parseInt(cursor.id, 10) })
		})
	]);

	const response = {
		data: paginated.rows,
		meta: {
			beforeCursor: paginated.startCursor,
			afterCursor: paginated.endCursor,
			hasMore: !!paginated.hasNextPage,
			total: parseInt(count.toString(), 10)
		}
	} satisfies GetProductsAttributeResponse;

	return json(response);
};

export const POST = async ({ request, locals: { schemas } }) => {
	const { name, unitOfMeasure, values } = schemas.productsAttribute.parse(await request.json());

	const r = await db.transaction().execute(async (trx) => {
		const result = await trx
			.insertInto('ProductsAttribute')
			.values({ name, unitOfMeasure })
			.executeTakeFirst();

		if (!result.insertId)
			// TODO: [TRANSLATIONS].
			throw new Error('There was a problem trying to add the new product attribute.');

		await trx
			.insertInto('ProductsAttributeValue')
			.values(values.map((v) => ({ name: v, productsAttributeId: Number(result.insertId) })))
			.execute();
		return result;
	});

	return json({ succeed: r.insertId && r.insertId > 0 });
};
