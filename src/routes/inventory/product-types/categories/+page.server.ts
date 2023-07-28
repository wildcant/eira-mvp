import type { GetCategoriesResponse, GetDepartmentsResponse } from '$lib/api/types.js';
import { generateCategorySchema } from '$lib/schemas/category';
import { error, fail } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms/server';

export const load = async ({ fetch, locals: { $t } }) => {
	let categoriesJson;
	{
		const response = await fetch(`/api/products/categories.json?include=departments`);
		const apiResponse = await response.json();
		if (!response.ok) {
			throw error(response.status, apiResponse as { message: string });
		}
		categoriesJson = apiResponse as GetCategoriesResponse;
	}

	const newCategoryForm = await superValidate(generateCategorySchema({ $t }));
	return {
		categoriesJson,
		newCategoryForm,
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
	create: async ({ request, fetch, locals: { $t } }) => {
		const form = await superValidate(request, generateCategorySchema({ $t }));

		if (!form.valid) return fail(400, { form });

		const response = await fetch(`/api/products/categories.json`, {
			method: 'post',
			body: JSON.stringify(form.data)
		});

		const json = await response.json();

		if (!response.ok) return setError(form, json.message);
	}
};
