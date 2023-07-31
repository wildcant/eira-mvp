<script lang="ts" context="module">
	export type Route = {
		href: string;
		label: string;
	};
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$components/ui/button/Button.svelte';
	import { cn } from '$lib/utils';

	export let routes: Route[];
</script>

<nav class="flex gap-2 mt-4 relative">
	{#each routes as { href, label } (href)}
		<Button
			variant="link"
			size="unset"
			{href}
			class={cn('opacity-70 md:mr-2 text-xs', {
				'opacity-100 underline': $page.url.pathname.includes(href)
			})}
		>
			{label}
		</Button>
	{/each}
</nav>
