import type { GetDepartmentsResponse } from '$lib/api/types.js';
import { error } from '@sveltejs/kit';

export const load = async ({ fetch }) => {
	const response = await fetch(`/api/products/sub-categories.json`);
	const apiResponse = await response.json();

	if (!response.ok) {
		throw error(response.status, apiResponse as { message: string });
	}
	const subCategoriesJson = apiResponse as GetDepartmentsResponse;

	return { subCategoriesJson };
};
