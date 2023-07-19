<script lang="ts">
	import { cn } from '$lib/utils';
	import { getPopoverContext } from './Popover.svelte';

	let className: string | undefined | null = undefined;
	export { className as class };

	const { trigger } = getPopoverContext();
</script>

<button
	type="button"
	class={cn('trigger', className)}
	aria-label="Update dimensions"
	melt={$trigger}
>
	<slot />
</button>

<style lang="postcss">
	.trigger {
		@apply inline-flex h-9 w-9 items-center justify-center rounded-full bg-white p-0;
		@apply text-sm font-medium text-neutral-900 transition-colors hover:bg-white/90;
		@apply focus-visible:ring focus-visible:ring-neutral-400 focus-visible:ring-offset-2;
	}
</style>
