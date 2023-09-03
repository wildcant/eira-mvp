import type { Endpoint } from '$components/crud-data-table/index.js';
import type {
	GetCategoriesResponse,
	GetDepartmentsResponse,
	GetProductResponse,
	GetSubCategoriesResponse
} from '$lib/api/types.js';
import { relationships } from '$lib/database/helpers/validations.js';
import { fail } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms/client';
import type { AnyZodObject } from 'zod';
import type { Action } from './$types.js';

const endpoint = {
	url: '/api/products/products.json',
	params: {
		include: ['departments', 'categories', 'subcategories', 'images'],
		fields: ['id', 'name', 'description'] as const
	}
} satisfies Endpoint<'Product'>;

type ProductFields = (typeof endpoint)['params']['fields'][number];
type GetPartialProductResponse = GetProductResponse<
	ProductFields | 'department' | 'category' | 'subCategory' | 'image'
>;

export const load = async ({ params, locals: { fetcher, schemas } }) => {
	const { data } = await fetcher<GetPartialProductResponse>(
		`${endpoint.url}/${params.productId}?include=${endpoint.params.include.join(',')}&fields[${
			relationships.enum.products
		}]=${endpoint.params.fields.join(',')}`
	);

	const [name, description, categorization] = await Promise.all([
		await superValidate({ name: data.name }, schemas.product.pick({ name: true })),
		await superValidate(
			{ description: data.description },
			schemas.product.pick({ description: true })
		),
		await superValidate(
			{
				...(data.department?.id ? { departmentId: data.department.id } : {}),
				...(data.category?.id ? { categoryId: data.category.id } : {}),
				...(data.subCategory?.id ? { subCategoryId: data.subCategory.id } : {})
			},
			schemas.product.pick({ departmentId: true, categoryId: true, subCategoryId: true })
		)
	]);

	const forms = { name, description, categorization };

	return {
		endpoint,
		forms,
		...data,
		loadDepartments: fetcher<GetDepartmentsResponse>('/api/products/departments.json?all=true'),
		loadCategories: fetcher<GetCategoriesResponse>('/api/products/categories.json?all=true'),
		// TODO: Perf improvement, update autocomplete component to load data on demand to avoid loading all this at once.
		// e.g. load on scroll and load on search.
		loadSubCategories: fetcher<GetSubCategoriesResponse>(
			'/api/products/sub-categories.json?all=true'
		)
	};
};

const productPatchHandler =
	(schema: AnyZodObject): Action =>
	async ({ request, fetch, params }) => {
		console.log(schema.shape);

		const form = await superValidate(request, schema);
		console.log(form.valid);
		console.log(form.data);
		console.log(form.errors);

		if (!form.valid) return fail(400, { form });

		const response = await fetch(`/api/products/products.json/${params.productId}`, {
			method: 'PATCH',
			body: JSON.stringify(form.data)
		});

		const json = await response.json();

		if (!response.ok) return setError(form, json.message);

		return { form };
	};

export const actions = {
	name: (args) => productPatchHandler(args.locals.schemas.product.pick({ name: true }))(args),
	description: (args) =>
		productPatchHandler(args.locals.schemas.product.pick({ description: true }))(args),
	categorization: (args) => productPatchHandler(args.locals.schemas.productCategorization)(args)
};
