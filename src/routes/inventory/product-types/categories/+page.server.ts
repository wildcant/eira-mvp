import type { DatabaseTypes } from '$lib/database/types';
import { categorySchema } from '$lib/schemas/category';
import type { PaginatedApiResponse } from '$lib/types';
import { error } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';

export const load = async ({ fetch }) => {
	const response = await fetch(`/api/products/categories.json`);
	const apiResponse = await response.json();
	if (!response.ok) {
		throw error(response.status, apiResponse as { message: string });
	}
	const categoriesJson = apiResponse as PaginatedApiResponse<DatabaseTypes['Category']>;

	const newCategoryForm = await superValidate(categorySchema);
	return { categoriesJson, newCategoryForm };
};
