<script lang="ts">
	import type { ProductsAttribute } from '$lib/api/types';
	import type { Item } from '$lib/components/custom/autocomplete';
	import * as Autocomplete from '$lib/components/custom/autocomplete';
	import { TagsInputAutocomplete } from '$lib/components/custom/tags-input-autocomplete';
	import { Button } from '$lib/components/ui/button';
	import * as Table from '$lib/components/ui/table';
	import { t } from '$lib/i18n';
	import { Plus } from 'lucide-svelte';
	import { writable } from 'svelte/store';

	export let attributes: ProductsAttribute[];

	type AttributeItem = Item<number, { values: ProductsAttribute['values'] }>;
	const options: AttributeItem[] = attributes?.map((attr) => ({
		value: attr.id,
		label: attr.name,
		meta: { values: attr.values }
	}));

	const newProductAttributes = writable<Pick<ProductsAttribute, 'name' | 'unitOfMeasure'>[]>([]);

	const addNewProductAttribute = () =>
		newProductAttributes.update((attrs) => attrs.concat({ name: '', unitOfMeasure: '' }));

	let selectedAttribute: AttributeItem | undefined;
	$: allowedTags =
		selectedAttribute?.meta?.values?.map((v) => ({
			id: v.id.toString(),
			value: v.name
		})) ?? [];
</script>

<Table.Root>
	<Table.Header>
		<Table.Row>
			<Table.Head class="w-6/12">{$t('entity.attribute.singular.lowercase')}</Table.Head>
			<Table.Head class="w-6/12">{$t('common.word.options.lowercase')}</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each $newProductAttributes as row, index (index)}
			<Table.Row>
				<Table.Cell class="w-6/12">
					<Autocomplete.Root items={options} class="max-w-xs" bind:value={selectedAttribute}>
						<div class="cursor-pointer">
							<Autocomplete.Input class="capitalize" />
							<Autocomplete.Button />
						</div>

						<Autocomplete.Options let:filteredOptions>
							{#each filteredOptions as option, index (index)}
								<Autocomplete.Option class="capitalize" {index} item={option}>
									{option.label}
								</Autocomplete.Option>
							{/each}
						</Autocomplete.Options>
					</Autocomplete.Root>

					<!-- <Render of={cell.render()} /> -->
				</Table.Cell>
				<Table.Cell class="w-6/12">
					<TagsInputAutocomplete
						{allowedTags}
						disabled={!selectedAttribute || !allowedTags.length}
					/>
				</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>

<Button type="button" variant="link" on:click={addNewProductAttribute}>
	<Plus class="mr-2 h-4 w-4" />
	{$t('common.word.add.capitalize')}
</Button>
