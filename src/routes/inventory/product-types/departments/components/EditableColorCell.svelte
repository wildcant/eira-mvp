<script lang="ts">
	import type { EditableRowState } from '$components/shared/crud-data-table/addEditableRow';
	import Input from '$components/ui/input/Input.svelte';
	import Label from '$components/ui/label/Label.svelte';
	import type { Department } from '$lib/api/types';
	import type { BodyRow } from 'svelte-headless-table';

	export let id: string;
	export let row: BodyRow<Department>;
	export let value: unknown;
	export let editableRow: EditableRowState<Department>;

	const { editingRow, editing, updatedRow } = editableRow;
	$: isEditingCell = $editing && $editingRow?.id === row.id;
</script>

<div>
	{#if isEditingCell && $updatedRow}
		<Label>
			<Input type="color" bind:value={$updatedRow.color} name={id.toString()} />
		</Label>
	{:else}
		<div class="w-4 h-4 rounded-sm" style="background-color: {value};" />
	{/if}
</div>
