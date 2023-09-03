<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
	import type { Route } from './types';

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
