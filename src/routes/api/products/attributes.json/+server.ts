import type { GetProductsAttributeResponse } from '$lib/api/types.js';
import { db } from '$lib/database';
import { extractPaginationParams, paginate } from '$lib/database/helpers/pagination.js';
import { json } from '@sveltejs/kit';

export const GET = async ({ url }) => {
	const search = url.searchParams.get('search');

	let query = db.selectFrom('ProductsAttribute').selectAll();
	if (search) query = query.where('ProductsAttribute.name', 'like', `%${search}%`);

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
	const data = schemas.productsAttribute.parse(await request.json());
	const result = await db.insertInto('ProductsAttribute').values(data).executeTakeFirst();
	return json({ succeed: result.insertId && result.insertId > 0 });
};
