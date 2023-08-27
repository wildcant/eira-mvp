<script lang="ts">
	import type { GetProductsResponse } from '$lib/api/types.js';
	import { DataTable, DataTableCheckbox } from '$lib/components/custom/data-table';
	import Scroller from '$lib/components/custom/scroller/scroller.svelte';
	import { Search } from '$lib/components/custom/search';
	import { Button } from '$lib/components/ui/button';
	import { t } from '$lib/i18n';
	import type { PaginatedApiResponse } from '$lib/types.js';
	import { Plus } from 'lucide-svelte';
	import { createRender, createTable } from 'svelte-headless-table';
	import {
		addPagination,
		addSelectedRows,
		addSortBy,
		addTableFilter
	} from 'svelte-headless-table/plugins';
	import { writable } from 'svelte/store';

	export let data;
	const { endpoint, initialData } = data;
	const tableData = writable(initialData.data);

	export const table = createTable(tableData, {
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

	let loadingData = false;
	let hasMore = initialData.meta.hasMore;
	let after = initialData.meta.afterCursor;
	let totalItems = initialData.meta.total;

	const getQueryParams = () => {
		const q = new URLSearchParams();
		q.set('size', '10');
		if (after) q.set('after', after.toString());
		if ($filterValue) q.set('search', $filterValue);
		// Add params defined by parent component.
		return q.toString();
	};

	async function loadMore() {
		if (loadingData || !hasMore) return;
		loadingData = true;
		const response = await fetch(`${endpoint.url}?${getQueryParams()}`);
		const result = (await response.json()) as GetProductsResponse;
		$tableData = $tableData.concat(result.data);
		hasMore = result.meta.hasMore;
		after = result.meta.afterCursor;
		loadingData = false;
	}
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

<DataTable {viewModel} on:more={loadMore} />
