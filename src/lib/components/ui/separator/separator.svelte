<script lang="ts">
	import { Separator as SeparatorPrimitive } from '$lib/components/primitives';
	import { cn } from '$lib/utils';

	type $$Props = SeparatorPrimitive.Props & { subtle?: boolean };
	let className: string | undefined | null = undefined;
	export { className as class };
	export let orientation: $$Props['orientation'] = 'horizontal';
	export let decorative: $$Props['decorative'] = undefined;
	export let subtle: $$Props['subtle'] = false;
</script>

<SeparatorPrimitive.Root
	class={cn(
		'shrink-0 bg-border',
		orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
		{ 'opacity-50': subtle },
		className
	)}
	{orientation}
	{decorative}
	{...$$restProps}
/>
