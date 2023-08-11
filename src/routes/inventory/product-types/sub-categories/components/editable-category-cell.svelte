<script lang="ts">
	import type { EditableRowState } from '$components/crud-data-table/addEditableRow';
	import * as Autocomplete from '$lib/components/custom/autocomplete';
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
		{@const items = categories?.map((d) => ({
			label: d.name,
			value: d.id
		}))}
		{@const selectedItem = items.find((option) => option.value === $updatedRow?.categoryId)}
		<!-- TODO: Update updatedRow on autocomplete change. -->
		<Autocomplete.Root {items} value={selectedItem}>
			<Autocomplete.Label class="cursor-pointer">
				<Autocomplete.Input name="categoryId" disabled={$loading} />
				<Autocomplete.Button />
			</Autocomplete.Label>

			<Autocomplete.Options let:filteredOptions>
				{#each filteredOptions as option, index (index)}
					<Autocomplete.Option {index} item={option}>{option.label}</Autocomplete.Option>
				{/each}
			</Autocomplete.Options>
		</Autocomplete.Root>
	{/await}
{:else}
	<span>{row.original.category?.name}</span>
{/if}
