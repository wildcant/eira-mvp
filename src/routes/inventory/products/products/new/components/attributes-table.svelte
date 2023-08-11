<script lang="ts">
	import type { ProductsAttribute } from '$lib/api/types';
	import type { Item } from '$lib/components/custom/autocomplete';
	import * as Autocomplete from '$lib/components/custom/autocomplete';
	import * as Table from '$lib/components/ui/table';
	import { t } from '$lib/i18n';

	export let productsAttributes: ProductsAttribute[];
	const productAttributesOptions: Item<number>[] = productsAttributes.map((pa) => ({
		value: pa.id,
		label: pa.name
	}));

	const newProductAttributes = [];
</script>

<Table.Root>
	<Table.Header>
		<Table.Row>
			<Table.Head>{$t('entity.attribute.singular.lowercase')}</Table.Head>
			<Table.Head>{$t('common.word.options.lowercase')}</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		<!-- {#each productsAttributes as row (row.id)} -->
		<Table.Row>
			<Table.Cell>
				<Autocomplete.Root items={productAttributesOptions} class="max-w-xs">
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
			<Table.Cell>Options</Table.Cell>
		</Table.Row>
		<!-- {/each} -->
	</Table.Body>
</Table.Root>
