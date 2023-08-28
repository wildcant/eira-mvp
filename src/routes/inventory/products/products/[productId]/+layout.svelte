<script lang="ts">
	import { page } from '$app/stores';
	import { UNEXPECTED_ROW_TYPE } from '$components/crud-data-table/index.js';
	import type { Route } from '$components/navigation';
	import SubNavigation from '$components/navigation/sub-navigation.svelte';
	import type { GetProductsResponse } from '$lib/api/types.js';
	import Container from '$lib/components/custom/container/container.svelte';
	import { DataTable } from '$lib/components/custom/data-table';
	import { Search } from '$lib/components/custom/search';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { t } from '$lib/i18n';
	import { createRender, createTable } from 'svelte-headless-table';
	import {
		addPagination,
		addSelectedRows,
		addSortBy,
		addTableFilter
	} from 'svelte-headless-table/plugins';
	import { writable } from 'svelte/store';
	import ProductNameImageCell from '../_components/product-name-image-cell.svelte';

	export let data;
	const { endpoint } = data;
	const tableData = writable(data.initialData.data);

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
			header: $t('entity.product.singular.capitalize'),
			accessor: 'name',
			cell: ({ row }) => {
				if (!row.isData()) throw new Error(UNEXPECTED_ROW_TYPE);
				return createRender(ProductNameImageCell, { row });
			}
		})
	]);

	const viewModel = table.createViewModel(columns);

	const { filterValue } = viewModel.pluginStates.filter;

	let loadingData = false;
	let hasMore = data.initialData.meta.hasMore;
	let after = data.initialData.meta.afterCursor;
	let totalItems = data.initialData.meta.total;

	const getQueryParams = () => {
		const q = new URLSearchParams();
		q.set('size', '10');
		if (after) q.set('after', after.toString());
		if ($filterValue) q.set('search', $filterValue);
		// Add params defined by parent component.
		if (endpoint.params?.include?.length) q.set('include', endpoint.params?.include?.join(','));
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

	$: routes = [
		{
			href: `/inventory/products/products/${data.params.productId}/general-info`,
			label: $t('page.inventory.products.details.nav.general-info')
		},
		{
			href: `/inventory/products/products/${data.params.productId}/attributes`,
			label: $t('entity.attribute.plural.capitalize')
		}
	] satisfies Route[];
</script>

<section>
	<Container class="hidden lg:block">
		<h4 class="mb-4">
			{totalItems}
			{$t('entity.product.plural.capitalize')}
		</h4>

		<Search
			class="max-w-sm"
			placeholder="Filter products..."
			type="text"
			bind:value={$filterValue}
		/>

		<DataTable {viewModel} on:more={loadMore} />
	</Container>

	<Container>
		<h2>{$page.data.name}</h2>
		<SubNavigation {routes} />
		<Separator class="mb-4" />

		<slot />
	</Container>
</section>

<style>
	section {
		display: grid;
		gap: 1rem;
	}

	@media (min-width: 1024px) {
		section {
			grid-template-columns: 16rem 1fr;
		}
	}
</style>
