import type { Endpoint } from '$components/crud-data-table/index.js';
import type {
	GetAttributeResponse,
	GetProductAttributesResponse,
	GetProductResponse
} from '$lib/api/types.js';
import { relationships } from '$lib/database/helpers/validations.js';
import { fail } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms/client';

const productsEndpoint = {
	url: '/api/products/products.json',
	params: { fields: ['id', 'name'] }
} satisfies Endpoint<'Product'>;

type ProductFields = (typeof productsEndpoint)['params']['fields'][number];

export const load = async ({ params, locals: { fetcher, schemas } }) => {
	const productAttributesEndpoint = {
		url: `/api/products/products.json/${params.productId}/attributes.json`,
		params: { all: true }
	} satisfies Endpoint;

	const [product, productAttributes, allAttributes] = await Promise.all([
		fetcher<GetProductResponse<ProductFields>>(
			`${productsEndpoint.url}/${params.productId}?fields[${
				relationships.enum.products
			}]=${productsEndpoint.params.fields.join(',')}`
		).then((res) => res.data),
		fetcher<GetProductAttributesResponse>(
			`${productAttributesEndpoint.url}?all=${productAttributesEndpoint.params.all}`
		).then((res) => res),
		fetcher<GetAttributeResponse>('/api/products/attributes.json?all=true&include=values').then(
			(res) => res.data
		)
	]);

	const form = await superValidate(schemas.productAttribute);

	return {
		productsEndpoint,
		productAttributesEndpoint,
		...product,
		productAttributes,
		allAttributes,
		form
	};
};

export const actions = {
	create: async ({ request, fetch, params, locals: { schemas } }) => {
		const form = await superValidate(request, schemas.productAttribute);

		if (!form.valid) return fail(400, { form });

		const response = await fetch(
			`/api/products/products.json/${params.productId}/attributes.json`,
			{
				method: 'post',
				body: JSON.stringify(form.data)
			}
		);

		const json = await response.json();

		if (!response.ok) return setError(form, json.message);

		return { form };
	}
};
