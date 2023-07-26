<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function handleScroll(event: Event) {
		const target = event.target as HTMLInputElement;
		let scrollBottom = target.scrollHeight - target.scrollTop - target.clientHeight;
		if (scrollBottom < 200) dispatch('more');
	}
</script>

<div class="rounded-md border h-[448px] overflow-auto" on:scroll={handleScroll}>
	<slot />
</div>
