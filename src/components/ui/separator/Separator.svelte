<script lang="ts">
	import { cn } from '$lib/utils';
	import { createSeparator, type CreateSeparatorProps } from '@melt-ui/svelte';

	let className: string | undefined | null = undefined;
	export { className as class };

	export let orientation: CreateSeparatorProps['orientation'] = 'horizontal';
	export let decorative: CreateSeparatorProps['decorative'] = true;

	const { root } = createSeparator({ orientation, decorative });
</script>

<div
	melt={$root}
	class={cn(
		'bg-border',
		orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
		className
	)}
	{...$$restProps}
/>
