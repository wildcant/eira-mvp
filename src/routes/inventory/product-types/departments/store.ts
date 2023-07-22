import { writable } from 'svelte/store';

export const editing = writable(false);
export const deleting = writable(false);
