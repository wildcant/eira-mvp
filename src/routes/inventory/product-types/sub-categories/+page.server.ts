import type { Endpoint } from '$components/crud-data-table/types';
import type { GetCategoriesResponse, GetSubCategoriesResponse } from '$lib/api/types.js';
import { fail } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms/server';

export const load = async ({ locals: { schemas, fetcher } }) => {
	const endpoint = {
		url: '/api/products/sub-categories.json',
		params: { include: 'categories' }
	} satisfies Endpoint;

	const [initialData, categories] = await Promise.all([
		fetcher<GetSubCategoriesResponse>(`${endpoint.url}?include=${endpoint.params.include}`),
		fetcher<GetCategoriesResponse>(`/api/products/categories.json?all=true`).then(
			({ data }) => data
		)
	]);

	const form = await superValidate(schemas.subCategory);
	return {
		endpoint,
		initialData,
		form,
		categories
	};
};

export const actions = {
	create: async ({ request, fetch, locals: { schemas } }) => {
		const form = await superValidate(request, schemas.subCategory);

		if (!form.valid) return fail(400, { form });

		const response = await fetch(`/api/products/sub-categories.json`, {
			method: 'post',
			body: JSON.stringify(form.data)
		});

		const json = await response.json();

		if (!response.ok) return setError(form, json.message);

		return { form };
	}
};
