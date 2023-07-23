<script lang="ts">
	import { cn } from '$lib/utils';
	import { createLabel } from '@melt-ui/svelte';
	import { cva } from 'class-variance-authority';

	const labelVariants = cva(
		'text-sm font-medium leading-6 peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
	);

	let className: string | undefined | null = undefined;
	export { className as class };

	const root = createLabel();
</script>

<label use:root class={cn(labelVariants(), className)} {...$$restProps}>
	<slot />
</label>
