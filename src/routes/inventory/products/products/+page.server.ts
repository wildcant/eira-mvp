import type { Endpoint } from '$components/crud-data-table/types';
import type { GetProductsResponse } from '$lib/api/types.js';

export const load = async ({ locals: { fetcher } }) => {
	const endpoint = {
		url: '/api/products/products.json',
		params: { include: ['images', 'departments', 'categories', 'subcategories'] }
	} satisfies Endpoint;

	const initialData = await fetcher<GetProductsResponse>(
		`${endpoint.url}?include=${endpoint.params.include.join(',')}`
	);

	return { endpoint, initialData };
};
