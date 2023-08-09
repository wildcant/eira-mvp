// See https://kit.svelte.dev/docs/types#app

import type { CategoryZodSchema } from '$lib/schemas/category';
import type { DepartmentZodSchema } from '$lib/schemas/department';
import type { ProductZodSchema } from '$lib/schemas/product';
import type { ProductsAttributeZodSchema } from '$lib/schemas/products-attribute';
import type { SubCategoryZodSchema } from '$lib/schemas/sub-category';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			/** see src/hooks.server.ts for implementation details. */
			$t: (key: string) => string;
			schemas: {
				department: DepartmentZodSchema;
				category: CategoryZodSchema;
				subCategory: SubCategoryZodSchema;
				productsAttribute: ProductsAttributeZodSchema;
				product: ProductZodSchema;
			};
			fetcher: <T>(url: string) => Promise<T>;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
