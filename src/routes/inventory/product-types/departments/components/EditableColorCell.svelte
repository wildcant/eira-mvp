<script lang="ts">
	import type { EditableRowState } from '$components/crud-data-table/addEditableRow';
	import type { Department } from '$lib/api/types';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import type { BodyRow } from 'svelte-headless-table';

	export let id: string;
	export let row: BodyRow<Department>;
	export let value: unknown;
	export let editableRow: EditableRowState<Department>;

	const { editingRow, editing, updatedRow } = editableRow;
	$: isEditingCell = $editing && $editingRow?.id === row.id;
</script>

{#if isEditingCell && $updatedRow}
	<Label>
		<Input type="color" bind:value={$updatedRow.color} name={id.toString()} />
	</Label>
{:else}
	<div class="w-4 h-4 rounded-sm" style="background-color: {value};" />
{/if}
