<script lang="ts">
	import { cn } from '$lib/utils';
	import { getDialogContext } from './Dialog.svelte';

	let className: string | undefined | null = undefined;
	export { className as class };

	const { title } = getDialogContext();
</script>

<h2
	melt={$title}
	class={cn('text-lg font-semibold leading-none tracking-tight', className)}
	{...$$restProps}
>
	<slot />
</h2>
