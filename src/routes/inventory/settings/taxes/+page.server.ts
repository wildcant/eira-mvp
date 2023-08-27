import type { Endpoint } from '$components/crud-data-table/types.js';
import type { GetTaxesResponse } from '$lib/api/types.js';
import { fail } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms/server';

const endpoint = {
	url: '/api/products/taxes.json'
} satisfies Endpoint;

export const load = async ({ locals: { schemas, fetcher } }) => {
	const initialData = await fetcher<GetTaxesResponse>(endpoint.url);

	const form = await superValidate(schemas.tax);

	return { endpoint, initialData, form };
};

export const actions = {
	create: async ({ request, fetch, locals: { schemas } }) => {
		const form = await superValidate(request, schemas.tax);

		if (!form.valid) return fail(400, { form });

		const response = await fetch(endpoint.url, {
			method: 'post',
			body: JSON.stringify(form.data)
		});

		const json = await response.json();

		if (!response.ok) return setError(form, json.message);

		return { form };
	}
};
