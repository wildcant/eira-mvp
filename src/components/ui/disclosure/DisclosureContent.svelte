<script lang="ts">
	import { slide } from 'svelte/transition';
	import { getDisclosureContext } from './Disclosure.svelte';
	const { content, open } = getDisclosureContext();

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

{#if $open}
	<div melt={$content} class={className} transition:slide>
		<slot />
	</div>
{/if}
