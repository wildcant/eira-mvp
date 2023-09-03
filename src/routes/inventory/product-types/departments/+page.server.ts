import type { Endpoint } from '$components/crud-data-table/types';
import type { GetDepartmentsResponse } from '$lib/api/types.js';
import { fail } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms/server';

export const load = async ({ locals: { schemas, fetcher } }) => {
	const endpoint = {
		url: '/api/products/departments.json'
	} satisfies Endpoint;

	const initialData = await fetcher<GetDepartmentsResponse>(endpoint.url);

	const form = await superValidate(schemas.department);
	return { endpoint, initialData, form };
};

export const actions = {
	create: async ({ request, fetch, locals: { schemas } }) => {
		const form = await superValidate(request, schemas.department);

		if (!form.valid) return fail(400, { form });

		const response = await fetch(`/api/products/departments.json`, {
			method: 'post',
			body: JSON.stringify(form.data)
		});

		const json = await response.json();

		if (!response.ok) return setError(form, json.message);

		return { form };
	}
};
