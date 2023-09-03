<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';

	type $$Props = HTMLAttributes<HTMLTableCellElement>;
	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<th
	class={cn(
		'h-10 px-2 text-left align-middle font-medium text-muted-foreground uppercase text-xs [&:has([role=checkbox])]:pr-0',
		className
	)}
	{...$$restProps}
>
	<slot />
</th>
