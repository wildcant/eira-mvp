import type { GetProductVariantsResponse } from '$lib/api/types';
import { db } from '$lib/database';
import { join } from '$lib/database/helpers/joins';
import { extractPaginationParams, paginate } from '$lib/database/helpers/pagination';
import { validateRelationship } from '$lib/database/helpers/validations';
import { json } from '@sveltejs/kit';

export const GET = async ({ url, locals: { $t } }) => {
	let query = db.selectFrom('ProductVariant').selectAll();

	const include = url.searchParams.get('include')?.split(',');
	const relations = validateRelationship({
		$t,
		allowedRelationships: ['images', 'attributes'],
		include
	});
	if (relations?.length) {
		relations.forEach((relation) => {
			if (relation === 'images') query = query.select((eb) => [join.ProductVariant.with.Image(eb)]);
			if (relation === 'attributes')
				query = query.select((eb) => [join.ProductVariant.with.ProductVariantAttribute(eb)]);
		});
	}

	const { after, before, size } = extractPaginationParams(url);
	const [[{ count }], paginated] = await Promise.all([
		db
			.selectFrom('ProductVariant')
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
	} satisfies GetProductVariantsResponse;

	return json(response);
};
