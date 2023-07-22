<script lang="ts">
	import { cn } from '$lib/utils';
	import { getDialogContext } from './Dialog.svelte';

	let className: string | undefined | null = undefined;
	export { className as class };

	const { close } = getDialogContext();
</script>

<button melt={$close} {...$$restProps} class={cn(className)}>
	<slot />
</button>
