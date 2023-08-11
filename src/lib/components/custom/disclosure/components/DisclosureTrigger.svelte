<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
	import { melt } from '@melt-ui/svelte';
	import { ctx } from '../ctx';

	let className: string | undefined | null = undefined;
	export { className as class };

	const {
		elements: { trigger },
		states: { open }
	} = ctx.get();
</script>

<button
	use:melt={$trigger}
	class={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), '!p-0', className)}
	aria-label="Toggle"
>
	{#if $open}
		<slot name="open" />
	{:else}
		<slot name="closed" />
	{/if}

	<slot />
</button>
