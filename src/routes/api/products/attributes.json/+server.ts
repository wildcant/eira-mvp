import type { GetProductAttributeResponse } from '$lib/api/types.js';
import { db } from '$lib/database';
import { join } from '$lib/database/helpers/joins.js';
import { extractPaginationParams, paginate } from '$lib/database/helpers/pagination.js';
import { validateRelationship } from '$lib/database/helpers/validations.js';
import { json } from '@sveltejs/kit';

export const GET = async ({ url, locals: { $t } }) => {
	const search = url.searchParams.get('search');
	const all = Boolean(url.searchParams.get('all'));

	let query = db.selectFrom('ProductAttribute').selectAll();
	if (search) query = query.where('ProductAttribute.name', 'like', `%${search}%`);

	const include = url.searchParams.get('include');
	const relations = validateRelationship({
		$t,
		allowedRelationships: ['values'],
		include
	});
	if (relations?.length) {
		relations.forEach((relation) => {
			if (relation === 'values')
				query = query.select((eb) => [join.ProductAttribute.with.ProductAttributeValue(eb)]);
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
		} satisfies GetProductAttributeResponse);
	}

	const { after, before, size } = extractPaginationParams(url);
	const [[{ count }], paginated] = await Promise.all([
		db
			.selectFrom('ProductAttribute')
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
	} satisfies GetProductAttributeResponse;

	return json(response);
};

export const POST = async ({ request, locals: { schemas } }) => {
	const { name, unitOfMeasure, values } = schemas.productAttribute.parse(await request.json());

	const r = await db.transaction().execute(async (trx) => {
		const result = await trx
			.insertInto('ProductAttribute')
			.values({ name, unitOfMeasure })
			.executeTakeFirst();

		if (!result.insertId)
			// TODO: [TRANSLATIONS].
			throw new Error('There was a problem trying to add the new product attribute.');

		await trx
			.insertInto('ProductAttributeValue')
			.values(values.map((v) => ({ name: v, productAttributeId: Number(result.insertId) })))
			.execute();
		return result;
	});

	return json({ succeed: r.insertId && r.insertId > 0 });
};
