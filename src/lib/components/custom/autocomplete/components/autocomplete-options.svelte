<script lang="ts" context="module">
	import { cva } from 'class-variance-authority';
	export const selectContentVariants = cva(
		'relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80 translate-y-1'
	);
</script>

<script lang="ts">
	import { cn } from '$lib/utils';
	import { melt } from '@melt-ui/svelte';
	import { ctx } from '../ctx';

	const {
		states: { filteredItems },
		elements: { menu }
	} = ctx.get();
</script>

<ul use:melt={$menu} class={cn(selectContentVariants(), 'z-[190]')}>
	<slot filteredOptions={$filteredItems} />
</ul>
