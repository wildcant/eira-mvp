// See https://kit.svelte.dev/docs/types#app

import type {
	CategoryZodSchema,
	DepartmentZodSchema,
	ProductZodSchema,
	AttributeZodSchema,
	SubCategoryZodSchema,
	TaxZodSchema,
	ProductAttributeZodSchema,
	ProductCategorizationZodSchema
} from '$lib/schemas';

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
				attribute: AttributeZodSchema;
				tax: TaxZodSchema;
				product: ProductZodSchema;
				productAttribute: ProductAttributeZodSchema;
				productCategorization: ProductCategorizationZodSchema;
			};
			fetcher: <T>(url: string) => Promise<T>;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
