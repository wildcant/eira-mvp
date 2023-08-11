<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	export let href: HTMLAnchorAttributes['href'];

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<a {href} on:click class={cn(buttonVariants({ variant: 'link', size: 'sm' }), '!p-0', className)}>
	<slot />
</a>
