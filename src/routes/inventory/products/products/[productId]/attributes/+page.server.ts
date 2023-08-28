import type { Endpoint } from '$components/crud-data-table/index.js';
import type { GetProductAttributeResponse, Product, ProductAttribute } from '$lib/api/types.js';
import { relationships } from '$lib/database/helpers/validations.js';
import { superValidate } from 'sveltekit-superforms/client';

const endpoint = {
	url: '/api/products/products.json',
	params: {
		include: ['attributes'],
		fields: ['id'] as const
	}
} satisfies Endpoint;

type GetPartialProductResponse = {
	data: Pick<Product, (typeof endpoint)['params']['fields'][number]> & {
		attributes: ProductAttribute[];
	};
};

export const load = async ({ params, locals: { fetcher, schemas } }) => {
	const [allAttributes, product] = await Promise.all([
		fetcher<GetProductAttributeResponse>(
			'/api/products/attributes.json?all=true&include=values'
		).then((res) => res.data),
		fetcher<GetPartialProductResponse>(
			`${endpoint.url}/${params.productId}?include=${endpoint.params.include.join(',')}&fields[${
				relationships.enum.products
			}]=${endpoint.params.fields.join(',')}`
		).then((res) => res.data)
	]);

	const form = await superValidate(schemas.productAttribute);

	return { endpoint, ...product, allAttributes, form };
};
