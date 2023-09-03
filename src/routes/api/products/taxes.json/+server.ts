import type { GetTaxesResponse } from '$lib/api/types.js';
import { db } from '$lib/database';
import { extractPaginationParams, paginate } from '$lib/database/helpers/pagination.js';
import { json } from '@sveltejs/kit';

export const GET = async ({ url }) => {
	const search = url.searchParams.get('search');
	const all = Boolean(url.searchParams.get('all'));

	let query = db.selectFrom('Tax').selectAll();
	if (search) query = query.where('Tax.name', 'like', `%${search}%`);

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
		} satisfies GetTaxesResponse);
	}

	const { after, before, size } = extractPaginationParams(url);
	const [[{ count }], paginated] = await Promise.all([
		db
			.selectFrom('Tax')
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
	} satisfies GetTaxesResponse;

	return json(response);
};

export const POST = async ({ request, locals: { schemas } }) => {
	const data = schemas.tax.parse(await request.json());

	const r = await db.insertInto('Tax').values(data).executeTakeFirst();

	return json({ succeed: r.insertId && r.insertId > 0 });
};
