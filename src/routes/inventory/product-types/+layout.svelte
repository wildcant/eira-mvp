<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$components/ui/button/Button.svelte';
	import Separator from '$components/ui/separator/Separator.svelte';
	import { t } from '$lib/i18n';
	import { cn } from '$lib/utils';

	$: routes = [
		{
			href: '/inventory/product-types/departments',
			label: $t('entity.department.plural.capitalize')
		},
		{
			href: '/inventory/product-types/categories',
			label: $t('entity.category.plural.capitalize')
		},
		{
			href: '/inventory/product-types/sub-categories',
			label: $t('entity.sub-category.plural.capitalize')
		}
	];
</script>

<h1 class="font-bold text-2xl">{$t('page.inventory.product-types.title')}</h1>

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
