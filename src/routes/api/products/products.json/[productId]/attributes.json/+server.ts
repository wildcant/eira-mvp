import type { GetProductAttributesResponse } from '$lib/api/types.js';
import { db } from '$lib/database';
import { join } from '$lib/database/helpers/joins';
import { extractPaginationParams, paginate } from '$lib/database/helpers/pagination.js';
import { exists } from '$lib/database/helpers/validations';
import { json } from '@sveltejs/kit';

export const GET = async ({ params, url, locals: { $t } }) => {
	const productId = parseInt(params.productId, 10);
	await exists({ table: 'Product', id: productId, $t });

	const query = db
		.selectFrom('ProductAttribute')
		.select((eb) => [
			'id',
			join.ProductAttribute.with.Attribute(eb),
			join.ProductAttribute.with.ProductAttributeValue(eb),
			'createdAt',
			'updatedAt'
		])
		.where('productId', '=', productId);

	const all = Boolean(url.searchParams.get('all'));
	if (all) {
		const productAttributes = await query.execute();

		return json({
			data: productAttributes,
			meta: {
				beforeCursor: undefined,
				afterCursor: undefined,
				hasMore: false,
				total: productAttributes.length
			}
		} satisfies GetProductAttributesResponse);
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
	} satisfies GetProductAttributesResponse;

	return json(response);
};

const POST_PRODUCTS_ATTRIBUTE_TAG = '[Post][Products][Attribute]';
export const POST = async ({ request, params, locals: { schemas, $t } }) => {
	const productId = parseInt(params.productId, 10);
	await exists({ table: 'Product', id: productId, $t });

	const productAttribute = schemas.productAttribute.parse(await request.json());

	const r = await db.transaction().execute(async (trx) => {
		const result = await trx
			.insertInto('ProductAttribute')
			.values({ productId, attributeId: productAttribute.attribute.id })
			.executeTakeFirst();

		if (!result.insertId) {
			console.error(
				`${POST_PRODUCTS_ATTRIBUTE_TAG} There was a problem trying to insert the product attributes.`
			);
			throw new Error('There was a problem trying to add the new product.');
		}

		const productAttributeId = Number(result.insertId);

		await Promise.all(
			productAttribute.values.map(({ id: attributeValueId }) =>
				trx
					.insertInto('ProductAttributeValue')
					.values({ productAttributeId, attributeValueId })
					.executeTakeFirst()
			)
		);

		return result;
	});
	return json({ succeed: r.insertId && r.insertId > 0 });
};
