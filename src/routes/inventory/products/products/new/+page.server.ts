import type {
	GetCategoriesResponse,
	GetDepartmentsResponse,
	GetProductAttributeResponse,
	GetSubCategoriesResponse,
	GetTaxesResponse
} from '$lib/api/types.js';
import { fail } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms/server';

export const load = async ({ locals: { schemas, fetcher } }) => {
	const [attributes, categories, subCategories, departments, taxes] = await Promise.all([
		fetcher<GetProductAttributeResponse>(
			'/api/products/attributes.json?all=true&include=values'
		).then((res) => res.data),
		fetcher<GetCategoriesResponse>('/api/products/categories.json?all=true').then(
			(res) => res.data
		),
		fetcher<GetSubCategoriesResponse>('/api/products/sub-categories.json?all=true').then(
			(res) => res.data
		),
		fetcher<GetDepartmentsResponse>('/api/products/departments.json?all=true').then(
			(res) => res.data
		),
		fetcher<GetTaxesResponse>('/api/products/taxes.json?all=true').then((res) => res.data)
	]);

	const form = await superValidate(schemas.product);
	return { form, attributes, categories, departments, subCategories, taxes };
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
