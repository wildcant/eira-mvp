import type { DatabaseTypes } from '$lib/database/types';
import type { DepartmentZodSchema } from '$lib/schemas/department';
import { writable } from 'svelte/store';
import type { SuperValidated } from 'sveltekit-superforms';

export const editing = writable<
	{ state: false } | { state: true; department: DatabaseTypes['Department']; loading?: boolean }
>({ state: false });

export const newDepartmentFormState = writable<SuperValidated<DepartmentZodSchema>>();
