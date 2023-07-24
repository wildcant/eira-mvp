<script lang="ts">
	import { page } from '$app/stores';
	import { buttonVariants } from '$components/ui/button';
	import Disclosure from '$components/ui/disclosure/Disclosure.svelte';
	import DisclosureContent from '$components/ui/disclosure/DisclosureContent.svelte';
	import DisclosureLink from '$components/ui/disclosure/DisclosureLink.svelte';
	import DisclosureTrigger from '$components/ui/disclosure/DisclosureTrigger.svelte';
	import { t } from '$lib/i18n';
	import { cn } from '$lib/utils';
	import { ChevronDown, ChevronRight } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import { Routes, type Item } from '.';
	import NavigationIcon from './NavigationIcon.svelte';

	$: items = [
		{
			id: 'dashboard',
			title: $t('component.navigation.dashboard'),
			href: Routes.DASHBOARD,
			icon: 'layout-dashboard'
		},
		{
			id: 'inventory',
			title: $t('component.navigation.inventory'),
			icon: 'warehouse',
			href: Routes.INVENTORY,
			children: [
				{
					id: 'products',
					title: $t('component.navigation.products'),
					href: Routes.PRODUCTS,
					icon: 'box'
				},
				{
					id: 'product-types',
					title: $t('component.navigation.product-types'),
					href: Routes.PRODUCT_TYPES,
					icon: 'shapes'
				}
			]
		},
		{
			id: 'point-of-sale',
			title: $t('component.navigation.point-of-sale'),
			icon: 'store',
			href: Routes.POS,
			children: [
				{
					id: 'orders',
					title: $t('component.navigation.orders'),
					href: Routes.POS_ORDERS,
					icon: 'layout-list'
				}
			]
		}
	] satisfies Item[];

	const dispatch = createEventDispatcher();
	const navigate = () => dispatch('navigate');

	$: activeRoutes = items
		.map(({ children = [], ...item }) => [item, ...children])
		.flat()
		.filter(({ href }) => $page.url.pathname.includes(href))
		.map(({ href }) => href);
</script>

{#each items as parentItem (parentItem.id)}
	{@const activeParentItem = activeRoutes.includes(parentItem.href)}
	<Disclosure open={activeParentItem}>
		<div class="flex relative items-center">
			{#if parentItem.children}
				<DisclosureTrigger class="absolute -left-6">
					<ChevronRight slot="closed" />
					<ChevronDown slot="open" />
				</DisclosureTrigger>
			{/if}
			<DisclosureLink
				href={parentItem.href}
				class={cn('flex gap-2 opacity-70', { 'opacity-100 font-bold': activeParentItem })}
				on:click={navigate}
			>
				<NavigationIcon name={parentItem.icon} />
				<span>
					{parentItem.title}
				</span>
			</DisclosureLink>
		</div>
		<DisclosureContent class="ml-2 flex flex-col items-start">
			{#if parentItem.children}
				{#each parentItem.children as item (item.id)}
					{@const active = activeRoutes.includes(item.href)}
					<a
						href={item.href}
						class={cn(
							buttonVariants({ variant: 'link', size: 'sm' }),
							'!p-0 flex gap-2 opacity-70',
							{ 'opacity-100 font-bold': active }
						)}
						on:click={navigate}
					>
						<NavigationIcon name={item.icon} />
						<span>
							{item.title}
						</span>
					</a>
				{/each}
			{/if}
		</DisclosureContent>
	</Disclosure>
{/each}
