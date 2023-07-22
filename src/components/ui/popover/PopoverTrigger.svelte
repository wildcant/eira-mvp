<script lang="ts">
	import { cn } from '$lib/utils';
	import type { VariantProps } from 'class-variance-authority';
	import { buttonVariants } from '../button';
	import { getPopoverContext } from './Popover.svelte';

	let className: string | undefined | null = undefined;
	export { className as class };
	export let disabled: boolean = false;
	const { trigger } = getPopoverContext();

	export let variant: VariantProps<typeof buttonVariants>['variant'] = 'ghost';
</script>

<button
	type="button"
	class={cn(buttonVariants({ variant, size: 'icon' }), 'opacity-90', className)}
	aria-label="Update dimensions"
	melt={$trigger}
	{disabled}
>
	<slot />
</button>
