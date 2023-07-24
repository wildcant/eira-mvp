<script lang="ts">
	import { X } from 'lucide-svelte';
	import { fade } from 'svelte/transition';
	import { getPopoverContext } from './Popover.svelte';
	import { cn } from '$lib/utils';

	let className: string | undefined | null = undefined;
	export { className as class };

	export let withArrow = false;
	export let withClose = false;

	const { open, content, arrow, close } = getPopoverContext();
</script>

{#if $open}
	<div
		melt={$content}
		transition:fade={{ duration: 100 }}
		class={cn(
			'z-50 min-w-[128px] rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in zoom-in-90',
			{ 'min-h-[64px]': withClose },
			className
		)}
	>
		{#if withArrow}
			<div melt={$arrow} class="border" style="box-shadow: 0 0 0 1px #333;" />
		{/if}
		<slot />
		{#if withClose}
			<button
				melt={$close}
				class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
			>
				<X class="h-4 w-4" />
				<span class="sr-only">Close</span>
			</button>
		{/if}
	</div>
{/if}

<style lang="postcss">
	.close {
		@apply absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full;
		@apply text-neutral-900 transition-colors hover:bg-neutral-500/10;
		@apply focus-visible:ring focus-visible:ring-neutral-400 focus-visible:ring-offset-2;
		@apply bg-white p-0 text-sm font-medium;
	}
</style>
