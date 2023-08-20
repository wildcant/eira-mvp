<script lang="ts" generics="T extends string | number = string, TMeta extends Meta = MetaDefault">
	import { cn } from '$lib/utils';
	import type { ComboboxFilterFunction } from '@melt-ui/svelte';
	import { createEventDispatcher } from 'svelte';
	import { ctx } from '../ctx';
	import type { Item, Meta, MetaDefault, Props } from '../types';

	type GItem = Item<T, TMeta>;
	type $$Props = Props<GItem> & {
		class?: string | undefined | null;
	};
	export let value: $$Props['value'] = undefined;

	let className: string | undefined | null = undefined;
	export { className as class };

	const dispatch = createEventDispatcher();

	const filterFunction: ComboboxFilterFunction<GItem> = ({ itemValue, input }) => {
		const normalize = (str: string) => str.normalize().toLowerCase();
		const normalizedInput = normalize(input);
		return normalizedInput === '' || normalize(itemValue.label ?? '').includes(normalizedInput);
	};

	const {
		states: { value: localValue }
	} = ctx.set({
		defaultValue: value,
		filterFunction,
		onValueChange: ({ next }) => {
			value = next;
			dispatch('change', value);
			return next;
		}
	});

	$: value !== undefined && $localValue !== value && localValue.set(value);

	// Allow resetting the combobox.
	$: if (!value) localValue.set({} as unknown as GItem);
</script>

<div class={cn('relative', className)}>
	<slot />
</div>
