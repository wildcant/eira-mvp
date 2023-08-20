<script lang="ts">
	import { cn } from '$lib/utils';

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<span class={cn('block text-sm font-medium text-destructive', className)}>
	<slot />
</span>
