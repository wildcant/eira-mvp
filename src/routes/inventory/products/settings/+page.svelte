<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import CardContent from '$lib/components/ui/card/card-content.svelte';
	import { Percent, Tag } from 'lucide-svelte';

	const items = [
		{
			icon: Tag,
			title: 'Attributes',
			description: 'Provide common characteristics to classify your products.',
			href: '/inventory/products/settings/attributes'
		},
		{
			icon: Percent,
			title: 'Taxes',
			description: 'Define taxes.',
			href: '/inventory/products/settings/taxes'
		}
	];
</script>

<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3 grid-rows-1">
	{#each items as item}
		<a href={item.href} class="h-full w-full">
			<Card.Root class="shadow-md shadow-slate-200 dark:shadow-slate-800 w-full h-full">
				<Card.Header>
					<svelte:component this={item.icon} />
				</Card.Header>
				<CardContent>
					<h4>{item.title}</h4>
					<p>{item.description}</p>
				</CardContent>
			</Card.Root>
		</a>
	{/each}
</div>
