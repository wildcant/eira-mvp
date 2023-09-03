<script lang="ts">
	import { DataTable, DataTableCheckbox } from '$lib/components/custom/data-table';
	import { Search } from '$lib/components/custom/search';
	import { createRender, createTable } from 'svelte-headless-table';
	import {
		addPagination,
		addSelectedRows,
		addSortBy,
		addTableFilter
	} from 'svelte-headless-table/plugins';
	import { readable } from 'svelte/store';
	import { paymentData } from './data';

	export const table = createTable(readable(paymentData), {
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

		table.column({ header: 'Email', accessor: 'email' }),

		table.column({
			header: 'Amount',
			accessor: 'amount',
			cell: ({ value }) => {
				const formatted = new Intl.NumberFormat('en-US', {
					style: 'currency',
					currency: 'USD'
				}).format(value);
				return `${formatted}`;
			},
			plugins: {
				filter: { exclude: true }
			}
		}),

		table.column({ header: 'Status', accessor: 'status' })
	]);

	const viewModel = table.createViewModel(columns);

	const { filterValue } = viewModel.pluginStates.filter;
</script>

<div class="flex items-center py-4">
	<Search class="max-w-sm" placeholder="Filter emails..." type="text" bind:value={$filterValue} />
</div>

<DataTable {viewModel} class="min-h-[600px]" />
