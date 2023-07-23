<script lang="ts">
	import { cn } from '$lib/utils';
	import { X } from 'lucide-svelte';
	import { getDialogContext } from './Dialog.svelte';
	import DialogClose from './DialogClose.svelte';
	import DialogOverlay from './DialogOverlay.svelte';
	import DialogPortal from './DialogPortal.svelte';
	import { flyAndScale } from './transition';

	let className: string | undefined | null = undefined;
	export { className as class };

	const { content, open } = getDialogContext();
</script>

<DialogPortal>
	{#if $open}
		<DialogOverlay />
		<div
			melt={$content}
			class={cn(
				`fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-md p-6 shadow-lg bg-background border gap-4 animate-in sm:max-w-lg sm:rounded-lg sm:zoom-in-90`,
				className
			)}
			transition:flyAndScale={{
				duration: 150,
				y: 8,
				start: 0.96
			}}
			{...$$restProps}
		>
			<slot />
		</div>
	{/if}
</DialogPortal>
