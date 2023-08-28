<script lang="ts" generics="T">
	import { cn } from '$lib/utils';
	import type { DataBodyRow } from 'svelte-headless-table';
	import type { EditableRowState } from './addEditableRow';

	export let id: keyof T;
	export let row: DataBodyRow<T>;
	export let editableRow: EditableRowState<T>;

	const { editingRow, editing, updatedRow } = editableRow;
	$: isEditingCell = $editing && $editingRow?.id === row.id;
</script>

<div>
	{#if isEditingCell && $updatedRow}
		<!-- TODO: Nice to have focus first column input. -->
		<input
			type="text"
			bind:value={$updatedRow[id]}
			name={id.toString()}
			class={cn('w-10 border border-primary')}
		/>
	{:else}
		<span>
			{row.original[id]}
		</span>
	{/if}
</div>
