<script lang="ts">
	import { SubNavigation, type Route } from '$components/navigation';
	import { Separator } from '$lib/components/ui/separator';
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

<h2>{$t('page.inventory.product-types.title')}</h2>

<SubNavigation {routes} />

<Separator class="mb-4" />

<slot />
