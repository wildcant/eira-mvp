import { getOptionUpdater, removeUndefined } from '$lib/components/internal/index.js';
import { createToggle, type CreateToggleProps } from '@melt-ui/svelte';

export const ctx = {
	set
};

function set(props: CreateToggleProps) {
	const toggle = createToggle(removeUndefined(props));
	return {
		...toggle,
		updateOption: getOptionUpdater(toggle.options)
	};
}
