import type { GetSubCategoriesResponse } from '$lib/api/types.js';
import { join } from '$lib/database/helpers/joins.js';
import { extractPaginationParams, paginate } from '$lib/database/helpers/pagination.js';
import { validateRelationship } from '$lib/database/helpers/validations.js';
import { db } from '$lib/database/index.js';
import { json } from '@sveltejs/kit';

export const GET = async ({ url, locals: { $t } }) => {
	let query = db.selectFrom('SubCategory').selectAll();

	const search = url.searchParams.get('search');
	if (search) query = query.where('SubCategory.name', 'like', `%${search}%`);

	const include = url.searchParams.get('include')?.split(',');
	const relations = validateRelationship({ $t, allowedRelationships: ['categories'], include });
	if (relations?.length) {
		relations.forEach((relation) => {
			if (relation === 'categories')
				query = query.select((eb) => [join.SubCategory.with.Category(eb)]);
		});
	}

	const { after, before, size } = extractPaginationParams(url);
	const [[{ count }], paginated] = await Promise.all([
		db
			.selectFrom('SubCategory')
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
	} satisfies GetSubCategoriesResponse;

	return json(response);
};
