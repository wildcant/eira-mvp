import type { GetProductsResponse } from '$lib/api/types';
import { db } from '$lib/database';
import { join } from '$lib/database/helpers/joins';
import { extractPaginationParams, paginate } from '$lib/database/helpers/pagination';
import { validateRelationship } from '$lib/database/helpers/validations';
import { json } from '@sveltejs/kit';
import pick from 'lodash/pick';

export const GET = async ({ url, locals: { $t } }) => {
	const search = url.searchParams.get('search');

	let query = db.selectFrom('Product').selectAll();
	if (search) query = query.where('Product.name', 'like', `%${search}%`);

	const include = url.searchParams.get('include');
	const relations = validateRelationship({
		$t,
		allowedRelationships: ['images', 'attributes', 'departments', 'categories', 'subcategories'],
		include
	});

	if (relations?.length) {
		relations.forEach((relation) => {
			if (relation === 'departments')
				query = query.select((eb) => [join.Product.with.Department(eb)]);

			if (relation === 'categories') query = query.select((eb) => [join.Product.with.Category(eb)]);

			if (relation === 'subcategories')
				query = query.select((eb) => [join.Product.with.SubCategory(eb)]);

			if (relation === 'images') query = query.select((eb) => [join.Product.with.Image(eb)]);

			if (relation === 'attributes')
				query = query.select((eb) => [join.Product.with.ProductAttribute(eb)]);
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

const POST_PRODUCTS_TAG = '[Post][Products]';
// TODO: [TRANSLATIONS].
export const POST = async ({ request, locals: { schemas } }) => {
	const data = schemas.product.parse(await request.json());

	const r = await db.transaction().execute(async (trx) => {
		const result = await trx
			.insertInto('Product')
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			.values({ ...pick(data, ['name', 'departmentId']), categoryId: data.categoryId! })
			.executeTakeFirst();

		if (!result.insertId) {
			console.error(
				`${POST_PRODUCTS_TAG} There was a problem trying to insert the product attributes.`
			);
			throw new Error('There was a problem trying to add the new product.');
		}

		const productId = Number(result.insertId);

		await Promise.all([
			...data.attributes.map(async ({ attribute, values }) => {
				const productAttributeItem = await trx
					.insertInto('ProductAttribute')
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					.values({ productId, attributeId: attribute.id })
					.executeTakeFirst();

				if (!productAttributeItem.insertId) {
					console.error(
						`${POST_PRODUCTS_TAG} There was a problem trying to insert the product attributes.`
					);
					throw new Error('There was a problem trying to add the new product.');
				}

				const productAttributeId = Number(productAttributeItem.insertId);

				return Promise.all(
					values.map(({ id: attributeValueId }) =>
						trx
							.insertInto('ProductAttributeValue')
							.values({ productAttributeId, attributeValueId })
							.executeTakeFirst()
					)
				);
			}),
			...data.variants.map(async (variant) => {
				const { price, averageCost, cost, sku, barcode, stock } = variant;
				const productVariant = await trx
					.insertInto('ProductVariant')
					.values({
						productId,
						price: price ?? 0,
						averageCost: averageCost ?? 0,
						cost: cost ?? 0,
						sku: sku ?? '',
						barcode: barcode ?? '',
						stock: stock ?? 0
					})
					.executeTakeFirst();

				if (!productVariant.insertId) {
					console.error(
						`${POST_PRODUCTS_TAG} There was a problem trying to insert a product variant.`
					);
					throw new Error('There was a problem trying to add the new product.');
				}

				const variantId = Number(productVariant.insertId);

				return Promise.all(
					Object.keys(variant.attributes).map((attributeKey) => {
						const attributeId = Number(attributeKey);
						const attributeValueId = variant.attributes[attributeId].value;
						trx
							.insertInto('ProductVariantAttribute')
							.values({ variantId, attributeId, attributeValueId })
							.executeTakeFirst();
					})
				);
			})
		]);

		return result;
	});

	return json({ succeed: r.insertId && r.insertId > 0 });
};
