<script lang="ts">
	import type { EditableRowState } from '$components/crud-data-table';
	import * as Autocomplete from '$lib/components/custom/autocomplete';

	import type { Category, Department } from '$lib/api/types';
	import type { DataBodyRow } from 'svelte-headless-table';

	export let row: DataBodyRow<Category>;
	export let editableRow: EditableRowState<Category>;
	export let departments: Department[];

	const { editingRow, editing, updatedRow, loading } = editableRow;
	$: isEditingCell = $editing && $editingRow?.id === row.id;

	type DepartmentItem = Autocomplete.Item<number, Department>;

	const options: DepartmentItem[] = departments?.map((d) => ({
		label: d.name,
		value: d.id,
		meta: d
	}));

	$: selectedItem = options.find((option) => option.value === $updatedRow?.departmentId);

	const updateRow = (e: CustomEvent<DepartmentItem>) => {
		if ($updatedRow) {
			$updatedRow = { ...$updatedRow, departmentId: e.detail.value, department: e.detail.meta };
		}
	};
</script>

{#if isEditingCell && $updatedRow}
	<Autocomplete.Root bind:value={selectedItem} on:change={updateRow}>
		<Autocomplete.Label class="cursor-pointer">
			<Autocomplete.Input name="departmentId" disabled={$loading} />
			<Autocomplete.Button />
		</Autocomplete.Label>

		<Autocomplete.Options>
			{#each options as option, index (index)}
				<Autocomplete.Option item={option}>{option.label}</Autocomplete.Option>
			{/each}
		</Autocomplete.Options>
	</Autocomplete.Root>
{:else}
	<span>{row.original.department?.name}</span>
{/if}
