import { getContext, setContext } from 'svelte';

/** Taken from radix svelte. */
export function uniqueContext<T>() {
	const key = Symbol();

	return {
		getContext: () => getContext<T>(key),
		setContext: (value: T) => setContext<T>(key, value)
	};
}
