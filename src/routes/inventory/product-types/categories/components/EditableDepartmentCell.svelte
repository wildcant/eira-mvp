<script lang="ts">
	import type { EditableRowState } from '$components/shared/crud-data-table/addEditableRow';
	import Autocomplete from '$components/ui/autocomplete/Autocomplete.svelte';
	import AutocompleteButton from '$components/ui/autocomplete/AutocompleteButton.svelte';
	import AutocompleteInput from '$components/ui/autocomplete/AutocompleteInput.svelte';
	import AutocompleteOption from '$components/ui/autocomplete/AutocompleteOption.svelte';
	import AutocompleteOptions from '$components/ui/autocomplete/AutocompleteOptions.svelte';
	import Label from '$components/ui/label/Label.svelte';
	import type { Category, Department } from '$lib/api/types';
	import type { DataBodyRow } from 'svelte-headless-table';

	export let row: DataBodyRow<Category>;
	export let editableRow: EditableRowState<Category>;
	export let departmentsPromise: Promise<Department[]>;

	const { editingRow, editing, updatedRow, loading } = editableRow;
	$: isEditingCell = $editing && $editingRow?.id === row.id;
</script>

<div>
	{#if isEditingCell && $updatedRow}
		{#await departmentsPromise}
			<span>Loading departments..</span>
		{:then departments}
			{@const options = departments?.map((d) => ({
				label: d.name,
				value: d.id
			}))}
			{@const selectedItem = options.find((option) => option.value === $updatedRow?.departmentId)}
			<!-- TODO: Update updatedRow on autocomplete change. -->
			<Autocomplete {options} {selectedItem}>
				<Label class="cursor-pointer">
					<AutocompleteInput name="departmentId" disabled={$loading} />
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
		<span>{row.original.department?.name}</span>
	{/if}
</div>
