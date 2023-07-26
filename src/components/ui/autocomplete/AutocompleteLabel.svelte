<script lang="ts">
	import Label from '$components/ui/label/Label.svelte';
	import { cn } from '$lib/utils';

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<Label class={cn('cursor-pointer', className)} {...$$restProps}>
	<slot />
</Label>
