import type { Endpoint } from '$components/crud-data-table/types';
import type { GetProductsResponse } from '$lib/api/types.js';
import { error } from '@sveltejs/kit';

export const load = async ({ fetch }) => {
	const endpoint = {
		url: '/api/products/products.json'
	} satisfies Endpoint;

	const response = await fetch(endpoint.url);
	const apiResponse = await response.json();

	if (!response.ok) {
		throw error(response.status, apiResponse as { message: string });
	}
	const initialData = apiResponse as GetProductsResponse;

	return { endpoint, initialData };
};
