import { extractPaginationParams, paginate } from '$lib/database/helpers/pagination.js';
import { db } from '$lib/database/index.js';
import type { DatabaseTypes } from '$lib/database/types.js';
import { categorySchema } from '$lib/schemas/category.js';
import type { PaginatedApiResponse } from '$lib/types.js';
import { json } from '@sveltejs/kit';

type GetResponse = PaginatedApiResponse<DatabaseTypes['Category']>;
export const GET = async ({ url }) => {
	const search = url.searchParams.get('search');

	let query = db.selectFrom('Category').selectAll();
	if (search) query = query.where('Category.name', 'like', `%${search}%`);

	const { after, before, size } = extractPaginationParams(url);
	const [[{ count }], paginated] = await Promise.all([
		db
			.selectFrom('Category')
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
	} satisfies GetResponse;

	return json(response);
};

export const POST = async ({ request }) => {
	const data = categorySchema.parse(await request.json());
	const result = await db.insertInto('Category').values(data).executeTakeFirst();
	return json({ succeed: result.insertId && result.insertId > 0 });
};
