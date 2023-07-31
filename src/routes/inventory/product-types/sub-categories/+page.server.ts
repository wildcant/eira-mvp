import type { Endpoint } from '$components/shared/crud-data-table/types';
import type { GetCategoriesResponse, GetSubCategoriesResponse } from '$lib/api/types.js';
import { error, fail } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms/server';

export const load = async ({ fetch, locals: { schemas } }) => {
	const endpoint = {
		url: '/api/products/sub-categories.json',
		params: { include: 'categories' }
	} satisfies Endpoint;

	let initialData;
	{
		console.log(`${endpoint.url}?include=${endpoint.params.include}`);

		const response = await fetch(`${endpoint.url}?include=${endpoint.params.include}`);
		const apiResponse = await response.json();
		if (!response.ok) {
			throw error(response.status, apiResponse as { message: string });
		}
		initialData = apiResponse as GetSubCategoriesResponse;
	}

	const form = await superValidate(schemas.subCategory);
	return {
		endpoint,
		initialData,
		form,
		lazy: {
			categories: fetch(`/api/products/categories.json`).then(async (response) => {
				const json = await response.json();
				if (!response.ok) {
					throw error(response.status, json);
				}
				return (json as GetCategoriesResponse).data;
			})
		}
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
