import { getOptionUpdater, removeUndefined } from '$lib/components/internal/index.js';
import {
	createCollapsible,
	type Collapsible as CollapsibleReturn,
	type CreateCollapsibleProps
} from '@melt-ui/svelte';
import { getContext, setContext } from 'svelte';

const NAME = 'Disclosure';

export const ctx = {
	get,
	set
};

function set(props: CreateCollapsibleProps) {
	const disclosure = createCollapsible(removeUndefined(props));
	setContext(NAME, disclosure);
	return {
		...disclosure,
		updateOption: getOptionUpdater(disclosure.options)
	};
}

function get() {
	return getContext<CollapsibleReturn>(NAME);
}
