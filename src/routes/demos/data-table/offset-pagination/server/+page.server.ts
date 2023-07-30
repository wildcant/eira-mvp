import type { Person } from '$lib/demos/samples';

export const load = async ({ fetch }) => {
	const response = await fetch(`/api/demos/offset/people.json`);
	const apiResponse = await response.json();
	return { people: apiResponse.data as Person[], total: apiResponse.total as number };
};
