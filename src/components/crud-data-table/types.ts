/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Relationship } from '$lib/database/helpers/validations';
import type { DataColumnInit } from 'svelte-headless-table/lib/columns';
import type {
	TableFilterColumnOptions,
	TableFilterPropSet,
	TableFilterState
} from 'svelte-headless-table/lib/plugins/addTableFilter';
import type {
	AnyTableAttributeSet,
	NewTablePropSet,
	TablePlugin
} from 'svelte-headless-table/lib/types/TablePlugin';
import type { SuperValidated } from 'sveltekit-superforms';
import type { AnyZodObject } from 'zod';
import type { EditableRowState } from '.';
import type { ComponentRenderConfig } from 'svelte-headless-table';
import type { SvelteComponent } from 'svelte';

export type Item = { id: string | number };

type Plugins<T> = {
	tableFilter: TablePlugin<
		any,
		TableFilterState<any>,
		TableFilterColumnOptions<any>,
		TableFilterPropSet,
		AnyTableAttributeSet
	>;
	editableRow: TablePlugin<T, EditableRowState<T>, Record<string, never>, NewTablePropSet<never>>;
};

export type CrudTableColumn<T /*, Value = unknown */> = /* Omit< */ DataColumnInit<
	T,
	Plugins<T>
> /*, 'cell'> */ & {
	// accessorFn?: (item: T) => Value;
	meta?: Record<string, string>;
};

export type CrudTableColumns<T /* , Value = unknown */> = Array<CrudTableColumn<T /* , Value */>>;

export type Endpoint = { url: string; params?: { include?: Relationship } };

export type NewEntityForm = SuperValidated<AnyZodObject>;

export type Create = {
	form: NewEntityForm;
	validators: AnyZodObject;
	component: ComponentRenderConfig<SvelteComponent>;
};

export type Update<
	TRowData extends Item,
	TEntitySchema extends Record<string, string | string[] | number | null>
> = {
	// Maps a row data to the shape of the update endpoint, useful when the shape of the row object doesn't match the api endpoint shape.
	dto: (row: TRowData) => TEntitySchema;
};
