<script lang="ts">
	import { selectItemVariants } from '$lib/components/ui/select/components/select-item.svelte';
	import { cn } from '$lib/utils';
	import { melt } from '@melt-ui/svelte';
	import { Check } from 'lucide-svelte';
	import { ctx } from '../ctx';
	import type { Item } from '../types';

	export let item: Item;
	export let index: number;
	let className: string | undefined | null = undefined;
	export { className as class };

	const {
		elements: { item: localItem },
		helpers: { isSelected }
	} = ctx.get();
</script>

<li
	class={cn(
		selectItemVariants(),
		'data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground',
		className
	)}
	use:melt={$localItem({
		index,
		item,
		disabled: item?.meta?.disabled
	})}
	{...$$restProps}
>
	{#if $isSelected(item)}
		<span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
			<Check class="h-4 w-4" />
		</span>
	{/if}

	<slot />
</li>
