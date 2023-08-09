<script lang="ts" context="module">
	import { uniqueContext } from '$lib/helpers/uniqueContext';
	import { cn } from '$lib/utils';
	import { createCombobox } from '@melt-ui/svelte';

	type AutocompleteContextProps = Pick<
		ReturnType<typeof createCombobox<Option>>,
		'filteredItems' | 'input' | 'menu' | 'isSelected' | 'item' | 'inputValue' | 'open'
	>;
	const { getContext, setContext: setAutocompleteContext } =
		uniqueContext<AutocompleteContextProps>();
	export const getAutocompleteContext = getContext;

	export type Meta = Record<string, string | number | boolean> & { disabled?: boolean };
	export type MetaDefault = { disabled?: boolean };
	export type Option<T extends string | number = string, TMeta extends Meta = MetaDefault> = {
		value: T;
		label: string;
		meta?: TMeta;
	};
</script>

<script lang="ts" generics="T extends string | number = string, TMeta extends Meta = MetaDefault">
	type AutocompleteOption = Option<T, TMeta>;
	export let options: AutocompleteOption[];
	export let selectedItem: AutocompleteOption | undefined = undefined;

	// TODO: How do we handle two way binding for value here? 🤔
	export let value: AutocompleteOption['value'] | undefined = undefined;
	let className: string | undefined | null = undefined;
	export { className as class };

	const {
		filteredItems,
		input,
		menu,
		isSelected,
		item,
		inputValue,
		open,
		selectedItem: selectedItemParam
	} = createCombobox<AutocompleteOption | undefined>({
		items: options,
		filterFunction: (item, inputVal) => {
			const normalize = (str: string) => str.normalize().toLowerCase();
			const normalizedInput = normalize(inputVal);
			return normalizedInput === '' || normalize(item?.label ?? '').includes(normalizedInput);
		},
		itemToString: (item) => item?.label ?? ''
	});

	setAutocompleteContext({
		filteredItems: filteredItems as any,
		input,
		menu,
		isSelected: isSelected as any,
		item: item as any,
		inputValue,
		open
	});

	// TODO: Fix controlled state.

	const startValue = $selectedItemParam?.value;
	$: if (selectedItem?.value !== startValue) {
		selectedItemParam.set(selectedItem);
		inputValue.set(selectedItem?.label ?? '');
	}

	// selectedItemParam.subscribe((newItem) => {
	// 	if (selectedItem?.value !== newItem?.value) {
	// 		selectedItem = newItem;
	// 		value = newItem?.value as AutocompleteOption['value'];
	// 	}
	// });

	// Temporal fix to reset the autocomplete when the input is cleared
	// $: if ($inputValue === '' && $selectedItemParam?.value) selectedItemParam.set(undefined);
</script>

<div class={cn('relative', className)}>
	<slot />
</div>
