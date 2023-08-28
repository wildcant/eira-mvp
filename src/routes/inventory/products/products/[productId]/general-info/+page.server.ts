import type { Endpoint } from '$components/crud-data-table/index.js';
import type { Category, Department, Image, Product, SubCategory } from '$lib/api/types.js';
import { relationships } from '$lib/database/helpers/validations.js';

const endpoint = {
	url: '/api/products/products.json',
	params: {
		include: ['departments', 'categories', 'subcategories', 'images'],
		fields: ['id', 'name', 'description'] as const
	}
} satisfies Endpoint;

type GetPartialProductResponse = {
	data: Pick<Product, (typeof endpoint)['params']['fields'][number]> & {
		department: Department;
		category: Category;
		subCategory: SubCategory | null;
		image: Image | null;
	};
};

export const load = async ({ params, locals: { fetcher } }) => {
	const { data } = await fetcher<GetPartialProductResponse>(
		`${endpoint.url}/${params.productId}?include=${endpoint.params.include.join(',')}&fields[${
			relationships.enum.products
		}]=${endpoint.params.fields.join(',')}`
	);

	return { endpoint, ...data };
};
