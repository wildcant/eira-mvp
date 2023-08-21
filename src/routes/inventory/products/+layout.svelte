<script lang="ts">
	import { SubNavigation, type Route } from '$components/navigation';
	import { Separator } from '$lib/components/ui/separator';
	import { t } from '$lib/i18n';

	$: routes = [
		{
			href: '/inventory/products/products',
			label: $t('entity.product.plural.capitalize')
		},
		{
			href: '/inventory/products/variants',
			label: $t('page.inventory.products.nav.product-variants')
		},
		{
			href: '/inventory/products/settings',
			label: $t('page.inventory.products.nav.settings')
		}
	] satisfies Route[];
</script>

<h1>{$t('entity.product.plural.capitalize')}</h1>

<SubNavigation {routes} />

<Separator class="mb-4" />

<slot />
