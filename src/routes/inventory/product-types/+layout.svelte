<script lang="ts">
	import SubNavigation, { type Route } from '$components/shared/sub-nav/SubNavigation.svelte';
	import Separator from '$components/ui/separator/Separator.svelte';
	import { t } from '$lib/i18n';

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
	] satisfies Route[];
</script>

<h1 class="font-bold text-2xl">{$t('page.inventory.product-types.title')}</h1>

<SubNavigation {routes} />

<Separator class="mb-4" />

<slot />
