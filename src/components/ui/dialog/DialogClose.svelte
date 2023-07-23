<script lang="ts">
	import { cn } from '$lib/utils';
	import { buttonVariants } from '../button';
	import { getDialogContext } from './Dialog.svelte';

	let className: string | undefined | null = undefined;
	export { className as class };
	export let disabled: boolean = false;

	const { close } = getDialogContext();
</script>

<button
	melt={$close}
	{...$$restProps}
	class={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), className)}
	{disabled}
>
	<slot />
</button>
