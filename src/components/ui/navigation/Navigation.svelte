<script lang="ts">
	import { page } from '$app/stores';
	import { createAccordion } from '@melt-ui/svelte';
	import { ChevronDown, ChevronRight } from 'lucide-svelte';
	import { slide } from 'svelte/transition';
	import NavigationItem from './NavigationItem.svelte';
	import { items } from './navigation-items';

	const { pathname } = $page.url;

	const activeRoute = items
		.map(({ children = [], ...item }) => [item, ...children])
		.flat()
		.find(({ href }) => href.includes(pathname))?.id;

	const activeItem = items.find(({ href }) => pathname.includes(href))?.id;

	const { content, item, trigger, isSelected, root } = createAccordion({
		value: activeItem
	});
</script>

<div class="" {...$root}>
	{#each items as { id, children, ...parentItem }, i}
		<div melt={$item(id)}>
			<div class="flex pl-6">
				{#if children}
					<button melt={$trigger(id)} class="absolute left-0">
						{#if !$isSelected(id)}
							<ChevronRight />
						{:else}
							<ChevronDown />
						{/if}
					</button>
				{/if}
				<NavigationItem {...parentItem} active={activeItem === id} />
			</div>

			{#if $isSelected(id) && children}
				<div melt={$content(id)} transition:slide>
					<div class="ml-10 pt-2 pb-3">
						{#each children as { id, ...item } (id)}
							<NavigationItem {...item} active={activeRoute === id} />
						{/each}
					</div>
				</div>
			{/if}
		</div>
	{/each}
</div>
