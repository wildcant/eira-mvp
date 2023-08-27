<script lang="ts" generics="T extends Item = Item">
	import {
		closeModal,
		openConfirmationModal,
		openCustomModal
	} from '$lib/components/custom/modal/actions';
	import { Scroller } from '$lib/components/custom/scroller';
	import { Search } from '$lib/components/custom/search';
	import { openToast } from '$lib/components/custom/toast';
	import { Button } from '$lib/components/ui/button';
	import * as Table from '$lib/components/ui/table';
	import { t } from '$lib/i18n';
	import type { PaginatedApiResponse } from '$lib/types';
	import { cn } from '$lib/utils';
	import debounce from 'lodash/debounce';
	import isEqual from 'lodash/isEqual';
	import { Plus } from 'lucide-svelte';
	import { DataBodyRow, Render, Subscribe, createRender, createTable } from 'svelte-headless-table';
	import { addTableFilter } from 'svelte-headless-table/plugins';
	import { get, writable } from 'svelte/store';
	import {
		EditActions,
		EditableCell,
		NEW_ENTITY_MODAL_ID,
		NewEntityModal,
		UNEXPECTED_ROW_TYPE,
		addEditableRow,
		type Create,
		type CrudTableColumns,
		type Endpoint,
		type Item,
		type Update
	} from '..';

	export let entity: string;
	export let title: string;
	export let initialData: PaginatedApiResponse<T>;
	let columnsParam: CrudTableColumns<T>;
	export { columnsParam as columns };
	export let endpoint: Endpoint;
	export let create: Create;

	export let update: Update<T, Record<string, string | string[] | number | null>> | undefined =
		undefined;

	const data = writable(initialData.data);

	const table = createTable(data, {
		tableFilter: addTableFilter({ serverSide: true }),
		editableRow: addEditableRow<T>()
	});

	const columns = table.createColumns([
		...columnsParam.map((column) =>
			table.column({
				...column,
				cell: column.cell
					? column.cell
					: ({ row, id, value }, { pluginStates: { editableRow } }) => {
							if (!row.isData()) throw new Error(UNEXPECTED_ROW_TYPE);
							return createRender(EditableCell, {
								row: row as any,
								id: id as never,
								value,
								editableRow,
								accessorFn: column.accessorFn as any
							});
					  }
			})
		),
		table.display({
			id: 'actions',
			header: '',
			cell: ({ row }, { pluginStates }) => {
				return createRender(Table.ActionsCell, {
					row,
					disabled: get(pluginStates.editableRow.editing)
				})
					.on('edit', (event) => pluginStates.editableRow.editingRow.set(event.detail))
					.on('delete', (event) =>
						openConfirmationModal({
							id: 'delete-row',
							title: $t('common.phrase.confirm-remove'),
							onConfirm: () => deleteRecord(event.detail)
						})
					);
			}
		})
	]);

	const { headerRows, rows, tableAttrs, tableBodyAttrs, pluginStates } =
		table.createViewModel(columns);

	/**
	 * Read (Pagination and filtering).
	 */
	const { filterValue } = pluginStates.tableFilter;

	let loadingData = false;
	let hasMore = initialData.meta.hasMore;
	let after = initialData.meta.afterCursor;
	let totalItems = initialData.meta.total;

	function resetTable() {
		$filterValue = '';
		$data = initialData.data;
		hasMore = initialData.meta.hasMore;
		after = initialData.meta.afterCursor;
	}

	const getQueryParams = () => {
		const q = new URLSearchParams();
		q.set('size', '10');
		if (after) q.set('after', after.toString());
		if ($filterValue) q.set('search', $filterValue);
		// Add params defined by parent component.
		if (endpoint.params?.include) q.set('include', endpoint.params?.include);
		return q.toString();
	};

	async function searchDepartments() {
		if (loadingData) return;
		loadingData = true;
		// Reset pagination when search changes
		after = undefined;
		const response = await fetch(`${endpoint.url}?${getQueryParams()}`);
		const result = (await response.json()) as PaginatedApiResponse<T>;
		$data = result.data;
		hasMore = result.meta.hasMore;
		after = result.meta.afterCursor;
		loadingData = false;
	}

	const handleSearchChanged = debounce((event: Event) => {
		const search = (event.target as HTMLInputElement).value;
		if (search) searchDepartments();
		else resetTable();
	}, 300);

	async function loadMore() {
		if (loadingData || !hasMore) return;
		loadingData = true;
		const response = await fetch(`${endpoint.url}?${getQueryParams()}`);
		const result = (await response.json()) as PaginatedApiResponse<T>;
		$data = $data.concat(result.data);
		hasMore = result.meta.hasMore;
		after = result.meta.afterCursor;
		loadingData = false;
	}

	async function reload() {
		if (loadingData) return;
		loadingData = true;
		after = undefined;
		const response = await fetch(`${endpoint.url}?${getQueryParams()}`);
		const result = (await response.json()) as PaginatedApiResponse<T>;
		$data = result.data;
		hasMore = result.meta.hasMore;
		after = result.meta.afterCursor;
		totalItems = result.meta.total;
		loadingData = false;
	}

	/**
	 * Update.
	 */
	const { editing, finishEditing, updatedRow, editingRow, loading } = pluginStates.editableRow;
	let dirty = false;
	$: if ($editing && $editingRow?.isData()) {
		dirty = !isEqual($editingRow.original, $updatedRow);
	} else dirty = false;

	const updateRecord = async () => {
		$loading = true;

		if (!$updatedRow) {
			console.error('TODO: Handle error updated row not defined');
			return;
		}

		const rowIndex = $data.findIndex((row) => $updatedRow!.id === row.id);
		if (rowIndex === -1) {
			console.error('TODO: Handle error row index not found');
			return;
		}

		try {
			const response = await fetch(`${endpoint.url}/${$updatedRow.id}`, {
				method: 'put',
				body: JSON.stringify(update?.dto ? update.dto($updatedRow) : $updatedRow)
			});

			const json = await response.json();

			if (!response.ok) throw new Error(json.message);

			openToast({
				data: {
					variant: 'default',
					title: $t('common.phrase.action-completed'),
					description: `
					${$t('entity.department.singular.capitalize')} 
					${$t('common.word.updated.lowercase')}
					`
				}
			});

			// Update table
			$data[rowIndex] = $updatedRow;
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : '';

			openToast({
				data: { variant: 'destructive', title: 'Error', description: errorMessage }
			});
		} finally {
			$loading = false;
			finishEditing();
		}
	};

	/**
	 * Delete.
	 */
	const deleteRecord = async (row: DataBodyRow<T>) => {
		$loading = true;

		if (!row.isData()) {
			console.error("TODO: Handle error can't delete a row that is not data");
			return;
		}

		const rowIndex = $data.findIndex((r) => r.id === row.original.id);
		if (rowIndex === -1) {
			console.error('TODO: Handle error row index not found');
			return;
		}

		try {
			const response = await fetch(`${endpoint.url}/${row.original.id}`, {
				method: 'delete'
			});

			const json = await response.json();

			if (!response.ok) throw new Error(json.message);

			openToast({
				data: {
					variant: 'default',
					title: $t('common.phrase.action-completed'),
					description: `
					${$t('entity.category.singular.capitalize')} 
					${$t('common.phrase.was-deleted')}
					`
				}
			});

			// Update table
			$data = $data.slice(0, rowIndex).concat($data.slice(rowIndex + 1));
			totalItems -= 1;
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : '';

			openToast({
				data: { variant: 'destructive', title: 'Error', description: errorMessage }
			});
		} finally {
			$loading = false;
		}
	};
</script>

<div>
	<div class="mb-4 flex justify-between items-center">
		<h4>
			{totalItems}
			{title}
		</h4>

		<Button
			variant="outline"
			class="min-w-fit"
			on:click={() =>
				openCustomModal({
					id: NEW_ENTITY_MODAL_ID,
					title: `${$t('common.word.new.capitalize')} ${$t(`entity.${entity}.singular.lowercase`)}`,
					children: createRender(NewEntityModal, {
						form: create.form,
						validators: create.validators
					})
						.slot(create.component)
						.on('success', () => {
							closeModal(NEW_ENTITY_MODAL_ID);
							reload();
						})
				})}
		>
			<Plus class="h-4 w-4 md:mr-2" />
			<span class="hidden md:inline">
				{$t('common.word.new.capitalize')}
				{$t(`entity.${entity}.singular.lowercase`)}
			</span>
		</Button>
	</div>

	{#if totalItems > 0}
		<Search bind:value={$filterValue} on:input={handleSearchChanged} on:reset={resetTable} />
	{/if}

	<div class="relative mt-4">
		<Scroller on:more={loadMore}>
			<Table.Root {...$tableAttrs} class="border-collapse">
				<Table.Header class="sticky top-0 bg-background z-10">
					{#each $headerRows as headerRow (headerRow.id)}
						<Subscribe rowAttrs={headerRow.attrs()} let:rowAttrs>
							<Table.Row {...rowAttrs}>
								{#each headerRow.cells as cell (cell.id)}
									<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
										{@const col = columnsParam.find((c) => c.accessor === cell.id)}
										<Table.Head {...attrs} class={col?.meta?.class}>
											<Render of={cell.render()} />
										</Table.Head>
									</Subscribe>
								{/each}
							</Table.Row>
						</Subscribe>
					{/each}
				</Table.Header>
				<Table.Body {...$tableBodyAttrs}>
					{#if $rows.length}
						{#each $rows as row (row.id)}
							<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
								<Table.Row {...rowAttrs}>
									{#each row.cells as cell (cell.id)}
										<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
											{@const col = columnsParam.find((c) => c.accessor === cell.id)}
											<Table.Cell
												{...attrs}
												class={cn({ 'bg-accent': props.tableFilter.matches }, col?.meta?.class)}
											>
												<Render of={cell.render()} />
											</Table.Cell>
										</Subscribe>
									{/each}
								</Table.Row>
							</Subscribe>
						{/each}
					{:else}
						<Table.Row>
							<Table.Cell colspan={columnsParam.length} class="h-24 text-center">
								{#if totalItems === 0}
									{$t('common.phrase.no-records')}
									{$t(`entity.${entity}.singular.lowercase`)}.
								{:else}
									{$t('common.phrase.no-results')}
								{/if}
							</Table.Cell>
						</Table.Row>
					{/if}
				</Table.Body>
			</Table.Root>
		</Scroller>
	</div>
</div>

{#if $editing && $updatedRow}
	<EditActions
		loading={$loading || loadingData}
		{dirty}
		on:update={updateRecord}
		on:cancel={finishEditing}
	/>
{/if}
