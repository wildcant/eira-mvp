<script lang="ts">
	import { onMount } from 'svelte';
	import { Render, Subscribe, createTable } from 'svelte-headless-table';
	import { addPagination } from 'svelte-headless-table/plugins';
	import { derived, writable } from 'svelte/store';
	import type { Person } from '$lib/demos/samples';

	export let data;

	const tableData = writable(data.people);
	const table = createTable(tableData, {
		page: addPagination({ serverSide: true })
	});

	const columns = table.createColumns([
		table.group({
			header: (_, { pageRows }) =>
				derived([pageRows], ([_pageRows]) => `Name (${_pageRows.length} on page)`),
			columns: [
				table.column({
					header: 'First Name',
					accessor: 'firstName'
				}),
				table.column({
					header: 'Last Name',
					accessor: 'lastName'
				})
			]
		}),
		table.group({
			header: 'Info',
			columns: [
				table.column({
					header: 'Age',
					accessor: 'age'
				}),
				table.column({
					header: 'Status',
					accessor: 'status'
				}),
				table.column({
					header: 'Visits',
					accessor: 'visits'
				}),
				table.column({
					header: 'Profile Progress',
					accessor: 'progress'
				})
			]
		})
	]);

	const { headerRows, rows, tableAttrs, tableBodyAttrs, pluginStates } =
		table.createViewModel(columns);
	const { pageIndex, pageCount, pageSize, hasNextPage, hasPreviousPage, serverItemCount } =
		pluginStates.page;
	serverItemCount.set(data.total);

	let loading = true;
	onMount(() => (loading = false));

	const loadPage = async (page: number) => {
		if (loading) return;
		loading = true;
		const q = new URLSearchParams();
		q.set('page', String(page));
		const r = await fetch(`/api/demos/offset/people.json?${q.toString()}`);
		const { data } = await r.json();
		$tableData = data as Person[];
		loading = false;
	};

	$: loadPage($pageIndex + 1);
</script>

<pre>{JSON.stringify(
		{
			$pageIndex: $pageIndex,
			$pageCount: $pageCount,
			$pageSize: $pageSize
		},
		null,
		2
	)}</pre>

<div>
	<button on:click={() => $pageIndex--} disabled={!$hasPreviousPage}>Previous page</button>
	{$pageIndex + 1} out of {$pageCount}
	<button on:click={() => $pageIndex++} disabled={!$hasNextPage}>Next page</button>
</div>
<label for="page-size">Page size</label>
<input id="page-size" type="number" min={1} bind:value={$pageSize} />

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
						<Subscribe attrs={cell.attrs()} let:attrs>
							<td {...attrs}>
								<Render of={cell.render()} />
							</td>
						</Subscribe>
					{/each}
				</tr>
			</Subscribe>
		{/each}
	</tbody>
</table>

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
</style>
