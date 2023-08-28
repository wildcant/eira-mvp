/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Relationship } from '$lib/database/helpers/validations';
import type { DatabaseTypes } from '$lib/database/types';
import type { PaginatedApiResponse } from '$lib/types';
import type { SelectType } from 'kysely';
import type { DB } from 'kysely-codegen';
import type { SvelteComponent } from 'svelte';
import type { ComponentRenderConfig } from 'svelte-headless-table';
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

export type RowData = { id: string | number };

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

type CrudTableColumn<T> = DataColumnInit<T, Plugins<T>> & {
	accessorFn?: (item: T) => string;
	meta?: Record<string, string>;
};

type CrudTableColumns<T> = Array<CrudTableColumn<T>>;

export type Endpoint<T extends keyof DatabaseTypes | void = void> = {
	url: string;
	params?: {
		include?: Relationship[];
		fields?: T extends keyof DB ? Readonly<Array<keyof SelectType<DB[T]>>> : never;
	};
};

export type NewEntityForm = SuperValidated<AnyZodObject>;

type Create = {
	form: NewEntityForm;
	validators: AnyZodObject;
	component: ComponentRenderConfig<SvelteComponent>;
};

type CustomRecord = Record<string, string | string[] | number | null>;

type Update<TRowData extends RowData, TEntitySchema extends CustomRecord> = {
	// Maps a row data to the shape of the update endpoint, useful when the shape of the row object doesn't match the api endpoint shape.
	dto: (row: TRowData) => TEntitySchema;
};

export type CrudDataTableProps<
	T extends RowData = RowData,
	TEntitySchema extends CustomRecord = CustomRecord
> = {
	class?: string | undefined | null;
	columns: CrudTableColumns<T>;
	create: Create;
	endpoint: Endpoint<any>;
	entity: string;
	hideSearch?: boolean | undefined;
	initialData: PaginatedApiResponse<T>;
	title: string;
	update?: Update<T, TEntitySchema> | undefined;
};
