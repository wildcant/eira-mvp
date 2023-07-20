<script lang="ts">
	import { cn } from '$lib/utils';
	import { getDisclosureContext } from './Disclosure.svelte';

	let className: string | undefined | null = undefined;
	export { className as class };

	const { trigger, open } = getDisclosureContext();
</script>

<button
	melt={$trigger}
	class={cn('relative data-[disabled]:cursor-not-allowed data-[disabled]:opacity-75', className)}
	aria-label="Toggle"
>
	{#if $open}
		<slot name="open" />
	{:else}
		<slot name="closed" />
	{/if}

	<slot />
</button>
