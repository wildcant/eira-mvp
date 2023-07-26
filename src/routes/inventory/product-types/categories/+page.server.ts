import type { DatabaseTypes } from '$lib/database/types';
import { categorySchema } from '$lib/schemas/category';
import type { PaginatedApiResponse } from '$lib/types';
import { error } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';

export const load = async ({ fetch }) => {
	let categoriesJson;
	{
		const response = await fetch(`/api/products/categories.json`);
		const apiResponse = await response.json();
		if (!response.ok) {
			throw error(response.status, apiResponse as { message: string });
		}
		categoriesJson = apiResponse as PaginatedApiResponse<DatabaseTypes['Category']>;
	}

	let departments;
	{
		const response = await fetch(`/api/products/departments.json`);
		const apiResponse = await response.json();
		if (!response.ok) {
			throw error(response.status, apiResponse as { message: string });
		}
		departments = (apiResponse as PaginatedApiResponse<DatabaseTypes['Department']>).data;
	}

	const newCategoryForm = await superValidate(categorySchema);
	return { categoriesJson, newCategoryForm, departments };
};
