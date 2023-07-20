<script lang="ts">
	import { page } from '$app/stores';
	import { cn } from '$lib/utils';
	$: route = $page.url.pathname.split('/').pop();

	const routes = [
		{ href: 'departments', label: 'Departments' },
		{ href: 'categories', label: 'Categories' },
		{ href: 'sub-categories', label: 'Sub categories' }
	];
</script>

<h1 class="font-bold text-2xl">Product Types</h1>

<nav class="flex gap-2 mt-4">
	{#each routes as { href, label } (href)}
		<a
			{href}
			class={cn('text-neutral-400 text-xs', {
				'text-white pb-[2px] border-b-2 border-b-zinc-500': route === href
			})}
		>
			{label}
		</a>
	{/each}
</nav>
<hr class="mb-4" />

<slot />
