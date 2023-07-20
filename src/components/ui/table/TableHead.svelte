<script lang="ts">
	import { cn } from '$lib/utils';

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<th
	class={cn(
		'h-10 px-2 text-left align-middle font-bold text-muted-foreground [&:has([role=checkbox])]:pr-0 text-xs',
		className
	)}
	{...$$restProps}
>
	<slot />
</th>
