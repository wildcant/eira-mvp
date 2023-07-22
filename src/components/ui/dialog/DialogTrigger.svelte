<script lang="ts">
	import { cn } from '$lib/utils';
	import { getDialogContext } from './Dialog.svelte';

	let className: string | undefined | null = undefined;
	export { className as class };

	const { trigger } = getDialogContext();
</script>

<button
	melt={$trigger}
	class={cn(
		`inline-flex items-center justify-center rounded-md bg-white px-4 py-2
    font-medium leading-none text-magnum-700 shadow-lg hover:opacity-75`,
		className
	)}
>
	Open Dialog
</button>
