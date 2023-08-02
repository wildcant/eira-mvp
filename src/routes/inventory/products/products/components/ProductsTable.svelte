<script lang="ts">
	import DataTable from '$components/shared/data-table/DataTable.svelte';
	import DataTableCheckbox from '$components/shared/data-table/DataTableCheckbox.svelte';
	import Search from '$components/shared/search/Search.svelte';
	import Button from '$components/ui/button/Button.svelte';
	import type { GetProductsResponse } from '$lib/api/types';
	import { t } from '$lib/i18n';
	import { Plus } from 'lucide-svelte';
	import { createRender, createTable } from 'svelte-headless-table';
	import {
		addPagination,
		addSelectedRows,
		addSortBy,
		addTableFilter
	} from 'svelte-headless-table/plugins';
	import { writable } from 'svelte/store';

	export let initialData: GetProductsResponse;
	const data = writable(initialData.data);

	export const table = createTable(data, {
		sort: addSortBy({ disableMultiSort: true }),
		page: addPagination(),
		filter: addTableFilter({
			fn: ({ filterValue, value }) => value.includes(filterValue)
		}),
		select: addSelectedRows()
	});

	export const columns = table.createColumns([
		table.column({
			header: (_, { pluginStates }) => {
				const { allRowsSelected } = pluginStates.select;
				return createRender(DataTableCheckbox, {
					checked: allRowsSelected
				});
			},
			accessor: ({ id }) => id,
			cell: ({ row }, { pluginStates }) => {
				const { getRowState } = pluginStates.select;
				const { isSelected } = getRowState(row);

				return createRender(DataTableCheckbox, { checked: isSelected });
			},
			plugins: {
				sort: { disable: true },
				filter: { exclude: true }
			}
		}),

		table.column({
			header: 'ID',
			accessor: 'id',
			plugins: {
				filter: { exclude: true }
			}
		}),

		table.column({ header: 'Name', accessor: 'name' })
	]);

	const viewModel = table.createViewModel(columns);

	const { filterValue } = viewModel.pluginStates.filter;
</script>

<div class="flex items-center justify-between py-4">
	<Search class="max-w-sm" placeholder="Filter products..." type="text" bind:value={$filterValue} />
	<Button variant="outline" class="min-w-fit" href="/inventory/products/products/new">
		<Plus class="h-4 w-4 md:mr-2" />
		<span class="hidden md:inline">
			{$t('common.word.new.capitalize')}
			{$t(`entity.product.singular.lowercase`)}
		</span>
	</Button>
</div>

<DataTable {viewModel} class="min-h-[600px]" />
