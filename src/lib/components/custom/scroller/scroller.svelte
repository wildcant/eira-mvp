<script lang="ts">
	import { cn } from '$lib/utils';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let className: string | undefined | null = undefined;
	export { className as class };

	function handleScroll(event: Event) {
		const target = event.target as HTMLInputElement;
		let scrollBottom = target.scrollHeight - target.scrollTop - target.clientHeight;
		if (scrollBottom < 200) dispatch('more');
	}
</script>

<div
	class={cn(
		'rounded-md border h-[30rem] xl:h-[32rem] 2xl:h-[38rem] 3xl:h-[49rem]  overflow-auto',
		className
	)}
	on:scroll={handleScroll}
>
	<slot />
</div>
