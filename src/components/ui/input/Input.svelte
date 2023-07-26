<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface $$Props extends HTMLInputAttributes {
		value?: HTMLInputAttributes['value'];
		disabled?: HTMLInputAttributes['disabled'];
		class?: string | undefined | null;
	}

	export let value: HTMLInputAttributes['value'] = undefined;
	export let disabled: HTMLInputAttributes['disabled'] = undefined;
	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<input
	class={cn(
		'flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
		className
	)}
	bind:value
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
