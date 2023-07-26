<script lang="ts" context="module">
	import { cva } from 'class-variance-authority';
	export const selectItemVariants = cva(
		'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
	);
</script>

<script lang="ts">
	import { cn } from '$lib/utils';
	import type { SelectOptionProps } from '@melt-ui/svelte';
	import { Check } from 'lucide-svelte';
	import { getSelectContext } from './Select.svelte';

	let className: string | undefined | null = undefined;
	export { className as class };

	export let value: SelectOptionProps['value'] = '';

	const { option, isSelected } = getSelectContext();
</script>

<div melt={$option({ value })} class={cn(selectItemVariants(), className)} {value} {...$$restProps}>
	{#if $isSelected(value)}
		<span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
			<Check class="h-4 w-4" />
		</span>
	{/if}

	<slot />
</div>
