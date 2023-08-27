<script lang="ts" context="module">
	import { cva } from 'class-variance-authority';
	export const selectTriggerVariants = cva(
		'flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
	);
</script>

<script lang="ts">
	import { Select as SelectPrimitive } from '$lib/components/primitives';
	import { ChevronDown } from 'lucide-svelte';
	import { cn } from '$lib/utils';

	type $$Props = SelectPrimitive.TriggerProps;
	let className: string | undefined | null = undefined;
	export let invalid: $$Props['invalid'] = false;
	export { className as class };
</script>

<SelectPrimitive.Trigger
	class={cn(selectTriggerVariants(), { 'border-red-500': invalid }, className)}
	{...$$restProps}
>
	<slot />
	<div>
		<ChevronDown class="h-4 w-4 opacity-50" />
	</div>
</SelectPrimitive.Trigger>
