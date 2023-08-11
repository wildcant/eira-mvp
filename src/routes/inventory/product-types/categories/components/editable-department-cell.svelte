<script lang="ts">
	import type { EditableRowState } from '$components/crud-data-table/addEditableRow';
	import * as Autocomplete from '$lib/components/custom/autocomplete';

	import type { Category, Department } from '$lib/api/types';
	import type { DataBodyRow } from 'svelte-headless-table';

	export let row: DataBodyRow<Category>;
	export let editableRow: EditableRowState<Category>;
	export let departmentsPromise: Promise<Department[]>;

	const { editingRow, editing, updatedRow, loading } = editableRow;
	$: isEditingCell = $editing && $editingRow?.id === row.id;
</script>

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
		<Autocomplete.Root items={options} value={selectedItem}>
			<Autocomplete.Label class="cursor-pointer">
				<Autocomplete.Input name="departmentId" disabled={$loading} />
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
	<span>{row.original.department?.name}</span>
{/if}
