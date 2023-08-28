<script lang="ts">
	import { Image } from 'lucide-svelte';
	import type { HTMLImgAttributes } from 'svelte/elements';

	type $$Props = HTMLImgAttributes & {
		alt?: string | undefined | null;
		src?: string | undefined | null;
	};

	export let alt: string | undefined | null = undefined;
	export let src: string | undefined | null = undefined;
</script>

<div class="w-10 h-8">
	{#if src}
		<img {src} {alt} {...$$restProps} />
	{:else}
		<Image class="w-full h-full" />
	{/if}
</div>
