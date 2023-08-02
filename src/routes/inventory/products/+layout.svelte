<script lang="ts">
	import SubNavigation, { type Route } from '$components/shared/sub-nav/SubNavigation.svelte';
	import Separator from '$components/ui/separator/Separator.svelte';
	import { t } from '$lib/i18n';

	$: routes = [
		{
			href: '/inventory/products/attributes',
			label: $t('page.inventory.products.nav.product-attributes')
		},
		{
			href: '/inventory/products/products',
			label: $t('entity.product.plural.capitalize')
		},
		{
			href: '/inventory/products/variants',
			label: $t('page.inventory.products.nav.product-variants')
		}
	] satisfies Route[];
</script>

<h1>{$t('entity.product.plural.capitalize')}</h1>

<SubNavigation {routes} />

<Separator class="mb-4" />

<slot />
