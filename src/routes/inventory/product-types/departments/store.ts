import type { DatabaseTypes } from '$lib/database/types';
import { writable } from 'svelte/store';

export const editing = writable<
	{ state: false } | { state: true; department: DatabaseTypes['Department']; loading?: boolean }
>({ state: false });
