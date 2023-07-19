<script lang="ts">
	import { X } from 'lucide-svelte';
	import { fade } from 'svelte/transition';
	import { getPopoverContext } from './Popover.svelte';
	import { cn } from '$lib/utils';

	let className: string | undefined | null = undefined;
	export { className as class };

	const { open, content, arrow, close } = getPopoverContext();
</script>

{#if $open}
	<div melt={$content} transition:fade={{ duration: 100 }} class={cn('content', className)}>
		<div melt={$arrow} />
		<slot />
		<button class="close" melt={$close}>
			<X class="h-4 w-4 " />
		</button>
	</div>
{/if}

<style lang="postcss">
	.content {
		@apply z-10 w-60 rounded-[4px] bg-white p-5 shadow-sm dark:shadow-white;
	}

	.close {
		@apply absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full;
		@apply text-neutral-900 transition-colors hover:bg-neutral-500/10;
		@apply focus-visible:ring focus-visible:ring-neutral-400 focus-visible:ring-offset-2;
		@apply bg-white p-0 text-sm font-medium;
	}
</style>
