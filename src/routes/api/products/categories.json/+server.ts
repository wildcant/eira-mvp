import type { GetCategoriesResponse } from '$lib/api/types.js';
import { join } from '$lib/database/helpers/joins.js';
import { extractPaginationParams, paginate } from '$lib/database/helpers/pagination.js';
import { validateRelationship } from '$lib/database/helpers/validations.js';
import { db } from '$lib/database/index.js';
import { generateCategorySchema } from '$lib/schemas/category.js';
import { json } from '@sveltejs/kit';

export const GET = async ({ url, locals: { $t } }) => {
	let query = db.selectFrom('Category').selectAll();

	const search = url.searchParams.get('search');
	if (search) query = query.where('Category.name', 'like', `%${search}%`);

	const include = url.searchParams.get('include')?.split(',');
	const relations = validateRelationship({ $t, allowedRelationships: ['departments'], include });
	if (relations?.length) {
		relations.forEach((relation) => {
			if (relation === 'departments')
				query = query.select((eb) => [join.Category.with.Department(eb)]);
		});
	}

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
	} satisfies GetCategoriesResponse;

	return json(response);
};

export const POST = async ({ request, locals: { $t } }) => {
	const data = generateCategorySchema({ $t }).parse(await request.json());
	const result = await db.insertInto('Category').values(data).executeTakeFirst();
	return json({ succeed: result.insertId && result.insertId > 0 });
};
