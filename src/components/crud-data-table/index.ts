import isUndefined from 'lodash/isUndefined';
import type { BodyRow } from 'svelte-headless-table';
import type { NewTablePropSet, TablePlugin } from 'svelte-headless-table/lib/types/TablePlugin';
import type { Readable, Writable } from 'svelte/store';
import { derived, writable } from 'svelte/store';

export type EditableRowState<Item> = {
	editing: Readable<boolean>;
	loading: Readable<boolean>;
	editingRow: Writable<BodyRow<Item> | undefined>;
	updatedRow: Writable<Item | undefined>;
	finishEditing: () => void;
};
export const addEditableRow =
	<Item>(): TablePlugin<
		Item,
		EditableRowState<Item>,
		Record<string, never>,
		NewTablePropSet<never>
	> =>
	() => {
		const loading = writable(false);
		const editingRow = writable<BodyRow<Item> | undefined>(undefined);
		const updatedRow = writable<Item | undefined>(undefined);
		const editing = derived(editingRow, ($editingRow) => !isUndefined($editingRow));

		// Not a derived because it needs to be updated with user input.
		editingRow.subscribe((row) => {
			if (row?.isData()) {
				updatedRow.set({ ...row.original });
			} else {
				updatedRow.set(undefined);
			}
		});

		const finishEditing = () => editingRow.set(undefined);

		const pluginState = { editing, editingRow, updatedRow, finishEditing, loading };
		return { pluginState };
	};

export { default as CrudDataTable } from './components/crud-data-table.svelte';
export { default as EditActions } from './components/edit-actions.svelte';
export { default as EditableCell } from './components/editable-cell.svelte';
export {
	default as NewEntityModal,
	NEW_ENTITY_MODAL_ID
} from './components/new-entity-modal.svelte';
export const UNEXPECTED_ROW_TYPE = 'Unexpected CRUD column definition - row is not of type data.';
export * from './types';
