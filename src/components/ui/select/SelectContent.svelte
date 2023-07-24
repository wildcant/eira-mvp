<script lang="ts">
	import { cn } from '$lib/utils';
	import { getSelectContext } from './Select.svelte';

	let className: string | undefined | null = undefined;
	export { className as class };

	const { menu } = getSelectContext();
</script>

<div
	melt={$menu}
	class={cn(
		'relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80 translate-y-1',
		className
	)}
	{...$$restProps}
>
	<slot />
</div>
