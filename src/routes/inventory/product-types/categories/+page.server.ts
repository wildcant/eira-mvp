import type { Endpoint } from '$components/crud-data-table/types';
import type { GetCategoriesResponse, GetDepartmentsResponse } from '$lib/api/types.js';
import { fail } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms/server';

export const load = async ({ locals: { schemas, fetcher } }) => {
	const endpoint = {
		url: '/api/products/categories.json',
		params: { include: ['departments'] }
	} satisfies Endpoint;

	const [initialData, departments] = await Promise.all([
		fetcher<GetCategoriesResponse>(`${endpoint.url}?include=${endpoint.params.include.join(',')}`),
		fetcher<GetDepartmentsResponse>(`/api/products/departments.json?all=true`).then(
			({ data }) => data
		)
	]);

	const form = await superValidate(schemas.category);
	return {
		endpoint,
		initialData,
		form,
		departments
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
