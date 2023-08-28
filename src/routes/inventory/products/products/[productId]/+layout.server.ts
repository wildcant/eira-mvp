import type { Endpoint } from '$components/crud-data-table/types';
import type { GetProductsResponse } from '$lib/api/types.js';

export const load = async ({ locals: { fetcher }, params }) => {
	const endpoint = {
		url: '/api/products/products.json',
		params: { include: ['images'] }
	} satisfies Endpoint;

	const initialData = await fetcher<GetProductsResponse>(endpoint.url);

	return { endpoint, initialData, params };
};
