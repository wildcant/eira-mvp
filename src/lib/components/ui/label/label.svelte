<script lang="ts" context="module">
	import { cva } from 'class-variance-authority';

	export const labelVariants = cva(
		'text-sm font-medium leading-6 peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
	);
</script>

<script lang="ts">
	import { Label as LabelPrimitive } from '$lib/components/primitives';
	import { cn } from '$lib/utils';

	type $$Props = LabelPrimitive.Props;
	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<LabelPrimitive.Root class={cn(labelVariants(), className)} {...$$restProps}>
	<slot />
</LabelPrimitive.Root>
