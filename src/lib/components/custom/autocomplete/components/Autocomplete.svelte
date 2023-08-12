<script lang="ts" generics="T extends string | number = string, TMeta extends Meta = MetaDefault">
	import { cn } from '$lib/utils';
	import { ctx } from '../ctx';
	import type { Item, Meta, MetaDefault, Props } from '../types';
	import { createEventDispatcher } from 'svelte';

	type $$Props = Props<Item<T, TMeta>> & {
		class?: string | undefined | null;
	};
	export let value: $$Props['value'] = undefined;
	export let items: $$Props['items'];

	let className: string | undefined | null = undefined;
	export { className as class };

	const dispatch = createEventDispatcher();

	const {
		states: { value: localValue }
	} = ctx.set({
		defaultValue: value,
		items,
		filterFunction: (item, inputVal) => {
			const normalize = (str: string) => str.normalize().toLowerCase();
			const normalizedInput = normalize(inputVal);
			return normalizedInput === '' || normalize(item?.label ?? '').includes(normalizedInput);
		},
		itemToString: (item) => item?.label ?? '',
		onValueChange: ({ next }) => {
			value = next;
			dispatch('change', value);
			return next;
		}
	});

	$: value !== undefined && $localValue !== value && localValue.set(value);
</script>

<div class={cn('relative', className)}>
	<slot />
</div>
