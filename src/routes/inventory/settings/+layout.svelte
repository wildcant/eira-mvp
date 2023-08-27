<script lang="ts">
	import { page } from '$app/stores';
	import { SubNavigation, type Route } from '$components/navigation';
	import { Separator } from '$lib/components/ui/separator';
	import { t } from '$lib/i18n';

	$: routes = [
		{
			href: '/inventory/settings/attributes',
			label: $t('entity.attribute.plural.capitalize')
		},
		{
			href: '/inventory/settings/taxes',
			label: $t('entity.tax.plural.capitalize')
		}
	] satisfies Route[];

	$: isRootSettingsPage = $page.route.id === '/inventory/settings';
</script>

<h2>{$t('common.word.inventory.capitalize')} {$t('common.word.settings.capitalize')}</h2>

{#if !isRootSettingsPage}
	<SubNavigation {routes} />
	<Separator class="mb-4" />
{/if}

<slot />
