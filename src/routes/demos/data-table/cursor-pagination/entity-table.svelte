<script lang="ts" generics="T">
	import Scroller from '$lib/components/custom/scroller/scroller.svelte';
	import type { PaginatedApiResponse } from '$lib/types';
	import { debounce } from 'lodash';
	import { Render, Subscribe, createTable } from 'svelte-headless-table';
	import { addTableFilter } from 'svelte-headless-table/plugins';
	import { writable } from 'svelte/store';

	export let apiResponse: PaginatedApiResponse<T>;
	let columnsParam: Array<{ header: string; accessor: keyof T }>;
	export { columnsParam as columns };
	export let endpoint: string;

	const data = writable(apiResponse.data);
	const table = createTable(data, {
		tableFilter: addTableFilter({ serverSide: true })
	});

	const columns = table.createColumns(
		columnsParam.map((c) =>
			table.column({
				header: c.header,
				accessor: c.accessor
			})
		)
	);

	const { headerRows, rows, tableAttrs, tableBodyAttrs, pluginStates } =
		table.createViewModel(columns);
	const { filterValue } = pluginStates.tableFilter;

	let loading = false;
	let hasMore = apiResponse.meta.hasMore;
	let after = apiResponse.meta.afterCursor;

	const getQueryParams = () => {
		const q = new URLSearchParams();
		q.set('size', '6');
		if (after) q.set('after', after.toString());
		if ($filterValue) q.set('search', $filterValue);
		return q.toString();
	};

	function reset() {
		$data = apiResponse.data;
		hasMore = apiResponse.meta.hasMore;
		after = apiResponse.meta.afterCursor;
	}

	async function searchDepartments(search: string) {
		if (loading) return;
		loading = true;
		const response = await fetch(`${endpoint}?search=${search}`);
		const result = (await response.json()) as PaginatedApiResponse<T>;
		$data = result.data;
		hasMore = result.meta.hasMore;
		after = result.meta.afterCursor;
		loading = false;
	}

	const handleSearchChanged = debounce((event: Event) => {
		const search = (event.target as HTMLInputElement).value;
		// Reset pagination when search changes
		after = '0';
		if (search) searchDepartments(search);
		else reset();
	}, 300);

	async function loadMore() {
		if (loading || !hasMore) return;
		loading = true;
		const response = await fetch(`${endpoint}?${getQueryParams()}`);
		const result = (await response.json()) as PaginatedApiResponse<T>;
		$data = $data.concat(result.data);
		hasMore = result.meta.hasMore;
		after = result.meta.afterCursor;
		loading = false;
	}
</script>

<input
	type="text"
	bind:value={$filterValue}
	on:input={handleSearchChanged}
	placeholder="Search rows..."
/>

<Scroller on:more={loadMore}>
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
								<td {...attrs} class:matches={props.tableFilter.matches}>
									<Render of={cell.render()} />
								</td>
							</Subscribe>
						{/each}
					</tr>
				</Subscribe>
			{/each}
		</tbody>
	</table>
</Scroller>

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
	input {
		width: 100%;
	}
	.matches {
		background: rgba(46, 196, 182, 0.2);
	}
</style>
