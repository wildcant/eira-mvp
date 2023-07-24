<script lang="ts">
	import { cn } from '$lib/utils';
	import { getSelectContext } from './Select.svelte';

	let className: string | undefined | null = undefined;
	export { className as class };

	const { separator } = getSelectContext();
</script>

<div melt={$separator} class={cn('-mx-1 my-1 h-px bg-muted', className)} {...$$restProps} />
