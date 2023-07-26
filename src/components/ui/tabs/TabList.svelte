<script lang="ts">
	import { cn } from '$lib/utils';
	import { getTabsContext } from './Tabs.svelte';

	let className: string | undefined | null = undefined;
	export { className as class };

	const { list } = getTabsContext();
</script>

<div
	melt={$list}
	class={cn(
		'inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground',
		className
	)}
>
	<slot />
</div>
