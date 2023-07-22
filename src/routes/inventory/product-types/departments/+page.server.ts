import type { DatabaseTypes } from '$lib/database/types';
import type { PaginatedApiResponse } from '$lib/types';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch }) => {
	const response = await fetch(`/api/products/departments.json`);
	const apiResponse = await response.json();
	if (!response.ok) {
		throw error(response.status, apiResponse as { message: string });
	}
	return apiResponse as PaginatedApiResponse<DatabaseTypes['Department']>;
}) satisfies PageServerLoad;
