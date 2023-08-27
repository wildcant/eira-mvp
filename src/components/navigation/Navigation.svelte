<script lang="ts">
	import { page } from '$app/stores';
	import * as Disclosure from '$lib/components/custom/disclosure';
	import { buttonVariants } from '$lib/components/ui/button';
	import { t } from '$lib/i18n';
	import { cn } from '$lib/utils';
	import {
		Box,
		ChevronDown,
		ChevronRight,
		LayoutDashboard,
		LayoutList,
		Settings,
		Shapes,
		Store,
		Warehouse
	} from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import { Routes, type Item } from './types';

	$: items = [
		{
			id: 'dashboard',
			title: $t('component.navigation.dashboard'),
			href: Routes.DASHBOARD,
			icon: LayoutDashboard
		},
		{
			id: 'inventory',
			title: $t('component.navigation.inventory'),
			icon: Warehouse,
			href: Routes.INVENTORY,
			children: [
				{
					id: 'products',
					title: $t('component.navigation.products'),
					href: Routes.PRODUCTS,
					icon: Box
				},
				{
					id: 'product-types',
					title: $t('component.navigation.product-types'),
					href: Routes.PRODUCT_TYPES,
					icon: Shapes
				},
				{
					id: 'inventory-settings',
					title: $t('component.navigation.settings'),
					href: Routes.INVENTORY_SETTINGS,
					icon: Settings
				}
			]
		},
		{
			id: 'point-of-sale',
			title: $t('component.navigation.point-of-sale'),
			icon: Store,
			href: Routes.POS,
			children: [
				{
					id: 'orders',
					title: $t('component.navigation.orders'),
					href: Routes.POS_ORDERS,
					icon: LayoutList
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
	<Disclosure.Root open={activeParentItem}>
		<div class="flex relative items-center">
			{#if parentItem.children}
				<Disclosure.Trigger class="absolute -left-6 h-5 w-5">
					<ChevronRight slot="closed" />
					<ChevronDown slot="open" />
				</Disclosure.Trigger>
			{/if}
			<Disclosure.Link
				href={parentItem.href}
				class={cn('flex gap-2 opacity-70', { 'opacity-100 font-bold': activeParentItem })}
				on:click={navigate}
			>
				<svelte:component this={parentItem.icon} />
				<span>
					{parentItem.title}
				</span>
			</Disclosure.Link>
		</div>
		<Disclosure.Content class="ml-2 flex flex-col items-start">
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
						<svelte:component this={item.icon} />
						<span>
							{item.title}
						</span>
					</a>
				{/each}
			{/if}
		</Disclosure.Content>
	</Disclosure.Root>
{/each}
