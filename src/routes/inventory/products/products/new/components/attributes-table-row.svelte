<script lang="ts">
	import type { ProductAttribute } from '$lib/api/types';
	import * as Autocomplete from '$lib/components/custom/autocomplete';
	import * as Form from '$lib/components/custom/form';
	import { TagsInputAutocomplete } from '$lib/components/custom/tags-input-autocomplete';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Table from '$lib/components/ui/table';
	import type { Tag } from '@melt-ui/svelte';
	import { effect } from '@melt-ui/svelte/internal/helpers';
	import { Trash } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import type { AttributeItem, LocalProductAttribute } from '../types';
	import type { Readable } from 'svelte/motion';

	export let key: string;
	export let selectableAttributes: Readable<ProductAttribute[]>;
	export let errors: string[] | undefined;

	const dispatch = createEventDispatcher();
	const tags = writable<Tag[]>([]);

	$: options = $selectableAttributes?.map((attr) => ({
		value: attr.id,
		label: attr.name,
		meta: { values: attr.values }
	})) satisfies AttributeItem[];

	let selectedAttribute: Writable<AttributeItem | undefined> = writable();
	$: allowedTags =
		$selectedAttribute?.meta?.values?.map((v) => ({
			id: v.id.toString(),
			value: v.name
		})) ?? [];

	// Reset tags when the attribute changes.
	effect(selectedAttribute, () => tags.set([]));

	effect([selectedAttribute, tags], ([$selectedAttribute, $tags]) => {
		dispatch('change', {
			data: {
				key,
				id: $selectedAttribute?.value,
				values: $tags.map((tag) => +tag.id)
			} satisfies LocalProductAttribute
		});
	});
</script>

<Table.Row>
	<Table.Cell class="w-4/12">
		<Autocomplete.Root class="max-w-xs" bind:value={$selectedAttribute}>
			<div class="cursor-pointer">
				<Autocomplete.Input class="capitalize" />
				<Autocomplete.Button />
			</div>

			<Autocomplete.Options>
				{#each options as option, index (index)}
					<Autocomplete.Option class="capitalize" item={option}>
						{option.label}
					</Autocomplete.Option>
				{/each}
			</Autocomplete.Options>
		</Autocomplete.Root>
	</Table.Cell>

	<Table.Cell class="w-6/12">
		<TagsInputAutocomplete
			{allowedTags}
			{tags}
			disabled={!selectedAttribute || !allowedTags.length}
			on:change={console.log}
		/>

		{#if errors?.length}
			<Form.Error>{errors?.join(', ')}</Form.Error>
		{/if}
	</Table.Cell>

	<Table.Cell class="w-2/12">
		<Button variant="ghost" size="icon" class="!p-0" on:click={() => dispatch('delete', key)}>
			<Trash class="w-4 h-4" />
		</Button>
	</Table.Cell>
</Table.Row>
