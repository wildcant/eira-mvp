<script lang="ts">
	import type { EditableRowState } from '$components/shared/crud-data-table/addEditableRow';
	import Autocomplete from '$components/ui/autocomplete/Autocomplete.svelte';
	import AutocompleteButton from '$components/ui/autocomplete/AutocompleteButton.svelte';
	import AutocompleteInput from '$components/ui/autocomplete/AutocompleteInput.svelte';
	import AutocompleteOption from '$components/ui/autocomplete/AutocompleteOption.svelte';
	import AutocompleteOptions from '$components/ui/autocomplete/AutocompleteOptions.svelte';
	import Label from '$components/ui/label/Label.svelte';
	import type { Category, SubCategory } from '$lib/api/types';
	import type { DataBodyRow } from 'svelte-headless-table';

	export let row: DataBodyRow<SubCategory>;
	export let editableRow: EditableRowState<SubCategory>;
	export let categoriesPromise: Promise<Category[]>;

	const { editingRow, editing, updatedRow, loading } = editableRow;
	$: isEditingCell = $editing && $editingRow?.id === row.id;
</script>

{#if isEditingCell && $updatedRow}
	{#await categoriesPromise}
		<span>Loading categories..</span>
	{:then categories}
		{@const options = categories?.map((d) => ({
			label: d.name,
			value: d.id
		}))}
		{@const selectedItem = options.find((option) => option.value === $updatedRow?.categoryId)}
		<!-- TODO: Update updatedRow on autocomplete change. -->
		<Autocomplete {options} {selectedItem}>
			<Label class="cursor-pointer">
				<AutocompleteInput name="categoryId" disabled={$loading} />
				<AutocompleteButton />
			</Label>

			<AutocompleteOptions let:filteredOptions>
				{#each filteredOptions as option, index (index)}
					<AutocompleteOption {index} {option}>{option.label}</AutocompleteOption>
				{/each}
			</AutocompleteOptions>
		</Autocomplete>
	{/await}
{:else}
	<span>{row.original.category?.name}</span>
{/if}
