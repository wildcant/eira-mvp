<script lang="ts">
	import { cn } from '$lib/utils';
	import { buttonVariants } from '../button';
	import { getDisclosureContext } from './Disclosure.svelte';

	let className: string | undefined | null = undefined;
	export { className as class };

	const { trigger, open } = getDisclosureContext();
</script>

<button
	melt={$trigger}
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
