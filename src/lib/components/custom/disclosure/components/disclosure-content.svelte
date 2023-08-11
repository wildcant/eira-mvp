<script lang="ts">
	import { melt } from '@melt-ui/svelte';
	import { slide } from 'svelte/transition';
	import { ctx } from '../ctx';

	let className: string | undefined | null = undefined;
	export { className as class };

	const {
		elements: { content },
		states: { open }
	} = ctx.get();
</script>

{#if $open}
	<div use:melt={$content} class={className} transition:slide>
		<slot />
	</div>
{/if}
