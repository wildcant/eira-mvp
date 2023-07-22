<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import { buttonVariants } from '../button';

	export let href: HTMLAnchorAttributes['href'];

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<a {href} on:click class={cn(buttonVariants({ variant: 'link', size: 'sm' }), '!p-0', className)}>
	<slot />
</a>
