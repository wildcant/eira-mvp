// See https://kit.svelte.dev/docs/types#app

import type { CategoryZodSchema } from '$lib/schemas/category';
import type { DepartmentZodSchema } from '$lib/schemas/department';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			$t: (key: string) => string;
			schemas: {
				department: DepartmentZodSchema;
				category: CategoryZodSchema;
			};
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
