<script lang="ts" generics="T extends Item">
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import type { BodyRow } from 'svelte-headless-table';
	import type { EditableRowState } from '..';
	import type { Item } from '../types';

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
