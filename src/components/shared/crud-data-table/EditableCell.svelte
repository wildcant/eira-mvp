<script lang="ts" generics="T extends Item">
	import Input from '$components/ui/input/Input.svelte';
	import Label from '$components/ui/label/Label.svelte';
	import type { BodyRow } from 'svelte-headless-table';
	import type { EditableRowState } from './addEditableRow';
	import type { Item } from './types';

	export let id: keyof T;
	export let row: BodyRow<T>;
	export let value: unknown;
	export let editableRow: EditableRowState<T>;

	const { editingRow, editing, updatedRow, loading } = editableRow;
	$: isEditingCell = $editing && $editingRow?.id === row.id;
</script>

<div>
	{#if isEditingCell && $updatedRow}
		<!-- TODO: Nice to have focus first column input. -->
		<Label>
			<Input type="text" bind:value={$updatedRow[id]} name={id.toString()} disabled={$loading} />
		</Label>
	{:else}
		<span>
			{value}
		</span>
	{/if}
</div>
