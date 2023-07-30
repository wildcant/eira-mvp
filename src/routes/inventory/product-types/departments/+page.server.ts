import type { Endpoint } from '$components/shared/crud-data-table/types';
import type { GetDepartmentsResponse } from '$lib/api/types.js';
import { error, fail } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms/server';

export const load = async ({ fetch, locals: { schemas } }) => {
	const endpoint = {
		url: '/api/products/departments.json'
	} satisfies Endpoint;

	const response = await fetch(endpoint.url);
	const apiResponse = await response.json();

	if (!response.ok) {
		throw error(response.status, apiResponse as { message: string });
	}
	const initialData = apiResponse as GetDepartmentsResponse;

	const superValidateForm = await superValidate(schemas.department);
	return { endpoint, initialData, superValidateForm };
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
