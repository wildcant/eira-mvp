import type { Endpoint } from '$components/crud-data-table/types.js';
import type { GetProductAttributeResponse } from '$lib/api/types.js';
import { fail } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms/server';

export const load = async ({ locals: { schemas, fetcher } }) => {
	const endpoint = {
		url: '/api/products/attributes.json',
		params: { include: ['values'] }
	} satisfies Endpoint;

	const initialData = await fetcher<GetProductAttributeResponse>(
		`${endpoint.url}?include=${endpoint.params.include.join(',')}`
	);

	const form = await superValidate(schemas.productAttribute);

	return { endpoint, initialData, form };
};

export const actions = {
	create: async ({ request, fetch, locals: { schemas } }) => {
		const form = await superValidate(request, schemas.productAttribute);

		if (!form.valid) return fail(400, { form });

		const response = await fetch(`/api/products/attributes.json`, {
			method: 'post',
			body: JSON.stringify(form.data)
		});

		const json = await response.json();

		if (!response.ok) return setError(form, json.message);

		return { form };
	}
};
