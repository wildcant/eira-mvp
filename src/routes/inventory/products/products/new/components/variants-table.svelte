<script lang="ts">
	import DataTable from '$lib/components/custom/data-table/data-table.svelte';
	import { createTable } from 'svelte-headless-table';
	import { addSortBy } from 'svelte-headless-table/plugins';
	import { writable } from 'svelte/store';

	const data = writable([]);

	export const table = createTable(data, {
		sort: addSortBy({ disableMultiSort: true })
	});

	export const columns = table.createColumns([
		table.column({
			header: 'SKU',
			accessor: 'sku'
		})
		// table.column({
		// 	header: $t('common.phrase.unit-of-measure'),
		// 	accessor: ''
		// })
	]);

	const viewModel = table.createViewModel(columns);
</script>

<DataTable {viewModel} class="min-h-[600px]" />
