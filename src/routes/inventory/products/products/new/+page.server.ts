import type { GetProductsAttributeResponse } from '$lib/api/types.js';
import { fail } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms/server';

export const load = async ({ locals: { schemas, fetcher } }) => {
	const productsAttributesApiResponse = await fetcher<GetProductsAttributeResponse>(
		'/api/products/attributes.json?all=true'
	);

	const form = await superValidate(schemas.product);
	return { form, productsAttributes: productsAttributesApiResponse.data };
};

export const actions = {
	create: async ({ request, fetch, locals: { schemas } }) => {
		const form = await superValidate(request, schemas.product);

		if (!form.valid) return fail(400, { form });

		const response = await fetch(`/api/products/products.json`, {
			method: 'post',
			body: JSON.stringify(form.data)
		});

		const json = await response.json();

		if (!response.ok) return setError(form, json.message);

		return { form };
	}
};
