<script lang="ts" context="module">
	import { cva } from 'class-variance-authority';

	export const inputVariants = cva(
		'flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
	);
</script>

<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Action } from 'svelte/action';
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface $$Props extends HTMLInputAttributes {
		value?: HTMLInputAttributes['value'];
		disabled?: HTMLInputAttributes['disabled'];
		class?: string | undefined | null;
		use?: Action;
	}

	export let value: HTMLInputAttributes['value'] = undefined;
	export let disabled: HTMLInputAttributes['disabled'] = undefined;
	let className: string | undefined | null = undefined;
	export { className as class };

	const useAction = (node: HTMLElement, action: Action | undefined) => {
		const actionReturn = action?.(node);
		return { update: actionReturn?.update, destroy: actionReturn?.destroy };
	};

	let action: Action | undefined = undefined;
	export { action as use };
</script>

<input
	class={cn(inputVariants(), className)}
	bind:value
	use:useAction={action}
	on:blur
	on:change
	on:click
	on:focus
	on:keydown
	on:keypress
	on:keyup
	on:mouseover
	on:mouseenter
	on:mouseleave
	on:paste
	on:input
	{disabled}
	aria-disabled={disabled}
	autocomplete="off"
	{...$$restProps}
/>
