<script lang="ts">
	import { cn } from '$lib/utils';
	import { createAvatar } from '@melt-ui/svelte';

	export let src: string;
	export let alt: string = 'Avatar';
	export let fallback: string;
	let className: string | undefined | null = undefined;
	export { className as class };

	const { image, fallback: meltFallback } = createAvatar({ src, delayMs: 300 });
</script>

<div class={cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', className)}>
	<img melt={$image} {alt} class={'aspect-square h-full w-full'} />
	<span
		melt={$meltFallback}
		class="!flex h-full w-full items-center justify-center rounded-full bg-zinc-300"
		>{fallback}</span
	>
</div>
