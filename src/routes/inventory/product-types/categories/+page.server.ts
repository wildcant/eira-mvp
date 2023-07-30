import type { Endpoint } from '$components/shared/crud-data-table/types';
import type { GetCategoriesResponse, GetDepartmentsResponse } from '$lib/api/types.js';
import { error, fail } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms/server';

export const load = async ({ fetch, locals: { schemas } }) => {
	const endpoint = {
		url: '/api/products/categories.json',
		params: { include: 'departments' }
	} satisfies Endpoint;

	let initialData;
	{
		const response = await fetch(`${endpoint.url}?include=${endpoint.params.include}`);
		const apiResponse = await response.json();
		if (!response.ok) {
			throw error(response.status, apiResponse as { message: string });
		}
		initialData = apiResponse as GetCategoriesResponse;
	}

	const form = await superValidate(schemas.category);
	return {
		endpoint,
		initialData,
		form,
		lazy: {
			departments: fetch(`/api/products/departments.json`).then(async (response) => {
				const json = await response.json();
				if (!response.ok) {
					throw error(response.status, json);
				}

				return (json as GetDepartmentsResponse).data;
			})
		}
	};
};

export const actions = {
	create: async ({ request, fetch, locals: { schemas } }) => {
		const form = await superValidate(request, schemas.category);

		if (!form.valid) return fail(400, { form });

		const response = await fetch(`/api/products/categories.json`, {
			method: 'post',
			body: JSON.stringify(form.data)
		});

		const json = await response.json();

		if (!response.ok) return setError(form, json.message);

		return { form };
	}
};
