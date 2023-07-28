import type { Category } from '$lib/api/types';
import type { CategoryZodSchema } from '$lib/schemas/category';
import { writable } from 'svelte/store';
import type { SuperValidated } from 'sveltekit-superforms';

export const editing = writable<
	{ state: false } | { state: true; category: Category; loading?: boolean }
>({ state: false });

export const newCategoryFormState = writable<{ form: SuperValidated<CategoryZodSchema> }>();
