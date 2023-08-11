<script lang="ts">
	import { Label } from '$lib/components/ui/label';
	import { cn } from '$lib/utils';

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<Label class={cn('cursor-pointer', className)} {...$$restProps}>
	<slot />
</Label>
