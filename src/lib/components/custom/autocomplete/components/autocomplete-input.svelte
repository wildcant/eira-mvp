<script lang="ts">
	import { selectTriggerVariants } from '$lib/components/ui/select/components/select-trigger.svelte';
	import { cn } from '$lib/utils';
	import { melt } from '@melt-ui/svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { ctx } from '../ctx';

	interface $$Props extends HTMLInputAttributes {}
	let className: string | undefined | null = undefined;
	export { className as class };

	const {
		elements: { input }
	} = ctx.get();
</script>

<input
	use:melt={$input}
	class={cn(selectTriggerVariants(), 'min-w-[3rem]', className)}
	{...$$restProps}
/>
