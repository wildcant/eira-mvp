import { getOptionUpdater, removeUndefined } from '$lib/components/internal/index.js';
import {
	createCombobox,
	type Combobox as ComboboxReturn,
	type CreateComboboxProps
} from '@melt-ui/svelte';
import { getContext, setContext } from 'svelte';
import type { Meta, MetaDefault, Item } from './types';

const NAME = 'Autocomplete';

function set<T extends string | number = string, TMeta extends Meta = MetaDefault>(
	props: CreateComboboxProps<Item<T, TMeta>>
) {
	const combobox = createCombobox({ ...removeUndefined(props) });
	setContext(NAME, combobox);
	return {
		...combobox,
		updateOption: getOptionUpdater(combobox.options)
	};
}

function get<T extends string | number = string, TMeta extends Meta = MetaDefault>() {
	return getContext<ComboboxReturn<Item<T, TMeta>>>(NAME);
}

export const ctx = {
	set,
	get,
	getInput: () => get().elements.input,
	getItem: () => get().elements.item,
	getLabel: () => get().elements.label,
	getMenu: () => get().elements.menu
};
