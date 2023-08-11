<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { fly } from 'svelte/transition';
	import type { ContentProps } from '../types.js';

	let className: string | undefined | null = undefined;
	export { className as class };

	type $$Props = ContentProps;
</script>

<div
	class={cn(
		'fixed left-0 top-0 z-50 h-screen w-full md:max-w-[208px] focus:outline-none',
		className
	)}
	transition:fly={{
		x: -208,
		duration: 500,
		opacity: 1
	}}
>
	<slot />
</div>
