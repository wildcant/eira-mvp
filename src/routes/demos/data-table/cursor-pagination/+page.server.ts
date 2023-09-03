import type { Person } from '$lib/demos/samples';
import type { PaginatedApiResponse } from '$lib/types.js';

export const load = async ({ fetch }) => {
	const response = await fetch(`/api/demos/cursor/people.json`);
	const apiResponse = await response.json();
	return { apiResponse: apiResponse as PaginatedApiResponse<Person> };
};
