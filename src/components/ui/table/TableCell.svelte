<script lang="ts">
	import { cn } from '$lib/utils';

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<td
	class={cn('p-2 align-middle [&:has([role=checkbox])]:pr-0 text-xs', className)}
	{...$$restProps}
>
	<slot />
</td>
