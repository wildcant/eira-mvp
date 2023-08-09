import type { GetProductsResponse } from '$lib/api/types.js';
import { db } from '$lib/database';
import { join } from '$lib/database/helpers/joins.js';
import { extractPaginationParams, paginate } from '$lib/database/helpers/pagination.js';
import { validateRelationship } from '$lib/database/helpers/validations.js';
import { json } from '@sveltejs/kit';

export const GET = async ({ url, locals: { $t } }) => {
	const search = url.searchParams.get('search');

	let query = db.selectFrom('Product').selectAll();
	if (search) query = query.where('Product.name', 'like', `%${search}%`);

	const include = url.searchParams.get('include')?.split(',');
	const relations = validateRelationship({ $t, allowedRelationships: ['images'], include });
	if (relations?.length) {
		relations.forEach((relation) => {
			if (relation === 'images') query = query.select((eb) => [join.Product.with.Image(eb)]);
		});
	}

	const { after, before, size } = extractPaginationParams(url);
	const [[{ count }], paginated] = await Promise.all([
		db
			.selectFrom('Product')
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
	} satisfies GetProductsResponse;

	return json(response);
};

export const POST = async ({ request, locals: { schemas } }) => {
	const data = schemas.product.parse(await request.json());
	const result = await db.insertInto('Product').values(data).executeTakeFirst();
	return json({ succeed: result.insertId && result.insertId > 0 });
};
