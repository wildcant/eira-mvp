<script lang="ts" context="module">
	import { cva } from 'class-variance-authority';
	export const selectTriggerVariants = cva(
		'flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
	);
</script>

<script lang="ts">
	import { cn } from '$lib/utils';
	import { ChevronDown } from 'lucide-svelte';
	import { getSelectContext } from './Select.svelte';

	let className: string | undefined | null = undefined;
	export { className as class };

	const { trigger, label } = getSelectContext();
</script>

<button melt={$trigger} class={cn(selectTriggerVariants(), className)} {...$$restProps}>
	{#if $label}
		{$label}
	{:else}
		<slot />
	{/if}
	<ChevronDown class="h-4 w-4 opacity-50" />
</button>
