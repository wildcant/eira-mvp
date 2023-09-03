<script lang="ts">
	import type { EditableRowState } from '$components/crud-data-table';
	import type { Tax } from '$lib/api/types';
	import * as Autocomplete from '$lib/components/custom/autocomplete';
	import { t } from '$lib/i18n';
	import type { DataBodyRow } from 'svelte-headless-table';
	import { taxScopeOptions } from '../options';

	export let row: DataBodyRow<Tax>;
	export let editableRow: EditableRowState<Tax>;

	const { editingRow, editing, updatedRow, loading } = editableRow;
	$: isEditingCell = $editing && $editingRow?.id === row.id;

	$: selectedItem = $taxScopeOptions.find((option) => option.value === $updatedRow?.scope);

	const updateRow = (e: CustomEvent<Autocomplete.Item<string>>) => {
		if ($updatedRow) {
			$updatedRow = { ...$updatedRow, scope: e.detail.value };
		}
	};
</script>

{#if isEditingCell && $updatedRow}
	<Autocomplete.Root bind:value={selectedItem} on:change={updateRow}>
		<Autocomplete.Label class="cursor-pointer">
			<Autocomplete.Input name="departmentId" class="capitalize" disabled={$loading} />
			<Autocomplete.Button />
		</Autocomplete.Label>

		<Autocomplete.Options>
			{#each $taxScopeOptions as option, index (index)}
				<Autocomplete.Option item={option}>{option.label}</Autocomplete.Option>
			{/each}
		</Autocomplete.Options>
	</Autocomplete.Root>
{:else}
	<span>{$t(`common.word.${row.original.scope}.capitalize`)}</span>
{/if}
