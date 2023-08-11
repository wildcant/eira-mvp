<script lang="ts">
	import { Button as ButtonPrimitive } from '$lib/components/primitives';
	import { cn } from '$lib/utils';
	import { Loader2 } from 'lucide-svelte';
	import { buttonVariants, type Size, type Variant } from '.';

	type $$Props = ButtonPrimitive.Props & {
		variant?: Variant;
		size?: Size;
		loading?: boolean;
		disabled?: boolean;
	};

	let className: string | undefined | null = undefined;
	export { className as class };
	export let variant: $$Props['variant'] = 'default';
	export let size: $$Props['size'] = 'default';
	export let builders: $$Props['builders'] = [];
	export let loading = false;
	export let disabled = false;
</script>

<ButtonPrimitive.Root
	{builders}
	class={cn(buttonVariants({ variant, size, className }))}
	disabled={loading || disabled}
	{...$$restProps}
	on:click
	on:change
	on:keydown
	on:keyup
	on:mouseenter
	on:mouseleave
>
	{#if loading}
		<Loader2 class="mr-2 h-4 w-4 animate-spin" />
	{/if}

	<slot />
</ButtonPrimitive.Root>
