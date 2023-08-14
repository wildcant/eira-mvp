<script lang="ts">
	import type { EditableRowState } from '$components/crud-data-table';
	import type { Category, SubCategory } from '$lib/api/types';
	import * as Autocomplete from '$lib/components/custom/autocomplete';
	import type { DataBodyRow } from 'svelte-headless-table';

	export let row: DataBodyRow<SubCategory>;
	export let editableRow: EditableRowState<SubCategory>;
	export let categories: Category[];

	const { editingRow, editing, updatedRow, loading } = editableRow;

	type CategoryItem = Autocomplete.Item<number, Category>;
	const items: CategoryItem[] = categories?.map((d) => ({
		label: d.name,
		value: d.id,
		meta: d
	}));

	$: selectedItem = items.find((option) => option.value === $updatedRow?.categoryId);

	$: isEditingCell = $editing && $editingRow?.id === row.id;

	const updateRow = (e: CustomEvent<CategoryItem>) => {
		if ($updatedRow) {
			$updatedRow = { ...$updatedRow, categoryId: e.detail.value, category: e.detail.meta };
		}
	};
</script>

{#if isEditingCell && $updatedRow}
	<Autocomplete.Root {items} bind:value={selectedItem} on:change={updateRow}>
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
{:else}
	<span>{row.original.category?.name}</span>
{/if}
