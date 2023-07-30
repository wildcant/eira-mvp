<script lang="ts" context="module">
	type Item = { id: string | number };
</script>

<script lang="ts" generics="T extends Item = Item">
	import isEqual from 'lodash/isEqual';
	import { openConfirmationModal } from '$components/shared/modal/ModalsManager.svelte';
	import { BodyRow, Render, Subscribe, createRender, createTable } from 'svelte-headless-table';
	import { writable } from 'svelte/store';
	import ActionsCell from './ActionsCell.svelte';
	import EditActions from './EditActions.svelte';
	import EditableCell from './EditableCell.svelte';
	import { addEditableRow } from './addEditableRow';

	export let data: T[];
	export let columns: Array<{ header: string; accessor: keyof T }>;

	const tableData = writable(data);
	const table = createTable(tableData, {
		editableRow: addEditableRow<T>()
	});

	let loading = false;
	const deleteRow = (row: BodyRow<T>) => {
		loading = true;
		if (!row.isData()) {
			console.error("TODO: Handle error can't delete a row that is not data");
			return;
		}

		const rowIndex = $tableData.findIndex((r) => r.id === row.original.id);
		if (rowIndex === -1) {
			console.error('TODO: Handle error row index not found');
			return;
		}

		$tableData = $tableData.slice(0, rowIndex).concat($tableData.slice(rowIndex + 1));
		loading = false;
	};

	const updateRow = () => {
		loading = true;
		if (!$updatedRow) {
			console.error('TODO: Handle error updated row not defined');
			return;
		}

		const rowIndex = $tableData.findIndex((row) => $updatedRow!.id === row.id);
		if (rowIndex === -1) {
			console.error('TODO: Handle error row index not found');
			return;
		}

		$tableData[rowIndex] = $updatedRow;
		loading = false;
		finishEditing();
	};

	const tableColumns = table.createColumns([
		...columns.map((col) =>
			table.column({
				header: col.header,
				accessor: col.accessor,
				cell: ({ row, id }, { pluginStates: { editableRow } }) => {
					return createRender(EditableCell, {
						row: row as any,
						id: id as never,
						editableRow
					});
				}
			})
		),
		table.display({
			id: 'actions',
			header: '',
			cell: ({ row }, { pluginStates }) => {
				return createRender(ActionsCell, { row, editing: pluginStates.editableRow.editing })
					.on('edit', (event) => pluginStates.editableRow.editingRow.set(event.detail))
					.on('delete', (event) =>
						openConfirmationModal({
							id: 'delete-row',
							title: `Are you sure you want to delete this row?`,
							onConfirm: () => deleteRow(event.detail)
						})
					);
			}
		})
	]);

	const { headerRows, rows, tableAttrs, tableBodyAttrs, pluginStates } =
		table.createViewModel(tableColumns);
	const { editing, finishEditing, updatedRow, editingRow } = pluginStates.editableRow;

	// Check if any edit field has changed to enable the save btn
	let dirty = false;
	$: if ($editing && $editingRow?.isData()) {
		dirty = !isEqual($editingRow.original, $updatedRow);
	} else dirty = false;
</script>

<table {...$tableAttrs}>
	<thead>
		{#each $headerRows as headerRow (headerRow.id)}
			<Subscribe rowAttrs={headerRow.attrs()} let:rowAttrs>
				<tr {...rowAttrs}>
					{#each headerRow.cells as cell (cell.id)}
						<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
							<th {...attrs}>
								<Render of={cell.render()} />
							</th>
						</Subscribe>
					{/each}
				</tr>
			</Subscribe>
		{/each}
	</thead>
	<tbody {...$tableBodyAttrs}>
		{#each $rows as row (row.id)}
			<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
				<tr {...rowAttrs}>
					{#each row.cells as cell (cell.id)}
						<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
							<td {...attrs}>
								<Render of={cell.render()} />
							</td>
						</Subscribe>
					{/each}
				</tr>
			</Subscribe>
		{/each}
	</tbody>
</table>

{#if $editing && $updatedRow}
	<EditActions {loading} {dirty} on:update={updateRow} on:cancel={finishEditing} />
{/if}

<style>
	table {
		border-spacing: 0;
		border-top: 1px solid black;
		border-left: 1px solid black;
	}
	th,
	td {
		border-bottom: 1px solid black;
		border-right: 1px solid black;
		padding: 0.5rem;
	}
</style>
