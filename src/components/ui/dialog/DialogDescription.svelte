<script lang="ts">
	import { cn } from '$lib/utils';
	import { getDialogContext } from './Dialog.svelte';

	let className: string | undefined | null = undefined;
	export { className as class };

	const { description } = getDialogContext();
</script>

<p melt={$description} class={cn('text-sm text-muted-foreground', className)} {...$$restProps}>
	<slot />
</p>
