<script lang="ts">
	import { page } from '$app/stores';
	import Disclosure from '$components/ui/disclosure/Disclosure.svelte';
	import DisclosureContent from '$components/ui/disclosure/DisclosureContent.svelte';
	import DisclosureLink from '$components/ui/disclosure/DisclosureLink.svelte';
	import DisclosureTrigger from '$components/ui/disclosure/DisclosureTrigger.svelte';
	import { cn } from '$lib/utils';
	import clsx from 'clsx';
	import { ChevronDown, ChevronRight } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import NavigationIcon from './NavigationIcon.svelte';
	import { items } from './navigation-items';

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
		<div class="flex relative py-2">
			{#if parentItem.children}
				<DisclosureTrigger class="absolute -left-6">
					<ChevronRight slot="closed" />
					<ChevronDown slot="open" />
				</DisclosureTrigger>
			{/if}
			<DisclosureLink
				href={parentItem.href}
				class={clsx('flex gap-2 text-neutral-400 text-sm', {
					'dark:text-white': activeParentItem
				})}
				on:click={navigate}
			>
				<NavigationIcon name={parentItem.icon} />
				<span>
					{parentItem.title}
				</span>
			</DisclosureLink>
		</div>
		<DisclosureContent class="ml-2">
			{#if parentItem.children}
				{#each parentItem.children as item (item.id)}
					{@const active = activeRoutes.includes(item.href)}
					<a
						href={item.href}
						class={cn('flex gap-2 text-neutral-400 text-sm py-2', { 'dark:text-white': active })}
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
