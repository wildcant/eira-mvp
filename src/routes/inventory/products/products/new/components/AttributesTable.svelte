<script lang="ts">
	import type { Option } from '$components/ui/autocomplete/Autocomplete.svelte';
	import Autocomplete from '$components/ui/autocomplete/Autocomplete.svelte';
	import AutocompleteButton from '$components/ui/autocomplete/AutocompleteButton.svelte';
	import AutocompleteInput from '$components/ui/autocomplete/AutocompleteInput.svelte';
	import AutocompleteOption from '$components/ui/autocomplete/AutocompleteOption.svelte';
	import AutocompleteOptions from '$components/ui/autocomplete/AutocompleteOptions.svelte';
	import Table from '$components/ui/table/Table.svelte';
	import TableBody from '$components/ui/table/TableBody.svelte';
	import TableCell from '$components/ui/table/TableCell.svelte';
	import TableHead from '$components/ui/table/TableHead.svelte';
	import TableHeader from '$components/ui/table/TableHeader.svelte';
	import TableRow from '$components/ui/table/TableRow.svelte';
	import type { ProductsAttribute } from '$lib/api/types';
	import { t } from '$lib/i18n';

	export let productsAttributes: ProductsAttribute[];
	const productAttributesOptions: Option<number>[] = productsAttributes.map((pa) => ({
		value: pa.id,
		label: pa.name
	}));

	const newProductAttributes = [];
</script>

<Table>
	<TableHeader>
		<TableRow>
			<TableHead>{$t('entity.attribute.singular.lowercase')}</TableHead>
			<TableHead>{$t('common.word.options.lowercase')}</TableHead>
		</TableRow>
	</TableHeader>
	<TableBody>
		<!-- {#each productsAttributes as row (row.id)} -->
		<TableRow>
			<TableCell>
				<Autocomplete options={productAttributesOptions} class="max-w-xs">
					<div class="cursor-pointer">
						<AutocompleteInput class="capitalize" />
						<AutocompleteButton />
					</div>

					<AutocompleteOptions let:filteredOptions>
						{#each filteredOptions as option, index (index)}
							<AutocompleteOption class="capitalize" {index} {option}>
								{option.label}
							</AutocompleteOption>
						{/each}
					</AutocompleteOptions>
				</Autocomplete>

				<!-- <Render of={cell.render()} /> -->
			</TableCell>
			<TableCell>Options</TableCell>
		</TableRow>
		<!-- {/each} -->
	</TableBody>
</Table>
