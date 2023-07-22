<script lang="ts">
	import { cn } from '$lib/utils';
	import { Loader2 } from 'lucide-svelte';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
	import { buttonVariants } from '.';
	import type { VariantProps } from 'class-variance-authority';

	let className: string | undefined | null = undefined;
	export { className as class };
	export let href: HTMLAnchorAttributes['href'] = undefined;
	export let type: HTMLButtonAttributes['type'] = undefined;
	export let variant: VariantProps<typeof buttonVariants>['variant'] = 'default';
	export let size: VariantProps<typeof buttonVariants>['size'] = 'default';
	export let loading: boolean = false;
	export let disabled: boolean = false;

	type Props = {
		class?: string | null;
		variant?: VariantProps<typeof buttonVariants>['variant'];
		size?: VariantProps<typeof buttonVariants>['size'];
		loading?: boolean;
		disabled?: boolean;
	};

	interface AnchorElement extends Props, HTMLAnchorAttributes {
		href?: HTMLAnchorAttributes['href'];
		type?: never;
		loading?: boolean;
		disabled?: boolean;
	}

	interface ButtonElement extends Props, HTMLButtonAttributes {
		type?: HTMLButtonAttributes['type'];
		href?: never;
		'aria-role'?: string;
		loading?: boolean;
		disabled?: boolean;
	}

	type $$Props = AnchorElement | ButtonElement;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<svelte:element
	this={href ? 'a' : 'button'}
	type={href ? undefined : type}
	{href}
	class={cn(buttonVariants({ variant, size }), className)}
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
</svelte:element>
