<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$components/ui/button/Button.svelte';
	import Separator from '$components/ui/separator/Separator.svelte';
	import { cn } from '$lib/utils';

	const routes = [
		{ href: '/inventory/product-types/departments', label: 'Departments' },
		{ href: '/inventory/product-types/categories', label: 'Categories' },
		{ href: '/inventory/product-types/sub-categories', label: 'Sub categories' }
	];
</script>

<h1 class="font-bold text-2xl">Product Types</h1>

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
<Separator class="mb-4" />

<slot />
