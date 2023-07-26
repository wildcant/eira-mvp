<script lang="ts" context="module">
	export const labelVariants = cva(
		'text-sm font-medium leading-6 peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
	);
</script>

<script lang="ts">
	import { cn } from '$lib/utils';
	import { createLabel } from '@melt-ui/svelte';
	import { cva } from 'class-variance-authority';

	let className: string | undefined | null = undefined;
	export { className as class };

	const root = createLabel();
</script>

<label use:root class={cn(labelVariants(), className)} {...$$restProps}>
	<slot />
</label>
