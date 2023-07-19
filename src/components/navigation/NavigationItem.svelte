<script lang="ts">
	import { cn } from '$lib/utils';
	import NavigationIcon from './NavigationIcon.svelte';
	import type { Item } from './navigation-items';

	export let href: Item['href'];
	export let title: Item['title'];
	export let icon: Item['icon'];
	export let active: boolean;
	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<a {href} class={cn('flex gap-2 text-neutral-400', { 'dark:text-white': active }, className)}>
	<NavigationIcon name={icon} />
	<span>
		{title}
	</span>
</a>
