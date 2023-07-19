<script lang="ts" generics="TItem, TPlugins extends AnyPlugins">
	import Button from '$components/ui/button/Button.svelte';
	import Table from '$components/ui/table/Table.svelte';
	import TableBody from '$components/ui/table/TableBody.svelte';
	import TableCell from '$components/ui/table/TableCell.svelte';
	import TableHead from '$components/ui/table/TableHead.svelte';
	import TableHeader from '$components/ui/table/TableHeader.svelte';
	import TableRow from '$components/ui/table/TableRow.svelte';
	import { cn } from '$lib/utils';
	import { ArrowUpDown } from 'lucide-svelte';
	import { Render, Subscribe, type TableViewModel } from 'svelte-headless-table';
	import type { AnyPlugins } from 'svelte-headless-table/lib/types/TablePlugin';

	export let viewModel: TableViewModel<TItem, TPlugins>;

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } = viewModel;
	const { sortKeys } = pluginStates.sort;
	const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page;

	const { selectedDataIds, allRowsSelected } = pluginStates.select;
	$: console.log($selectedDataIds);
</script>

<div>
	<div class="rounded-md border">
		<Table {...$tableAttrs}>
			<TableHeader>
				{#each $headerRows as headerRow (headerRow.id)}
					<Subscribe rowAttrs={headerRow.attrs()} let:rowAttrs>
						<TableRow {...rowAttrs}>
							{#each headerRow.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
									<TableHead {...attrs} class={cn(!props.sort.disabled && 'pl-1')}>
										{#if props.sort.disabled}
											<Render of={cell.render()} />
										{:else}
											<Button variant="ghost" on:click={props.sort.toggle}>
												<Render of={cell.render()} />
												<ArrowUpDown
													class={cn(
														$sortKeys[0]?.id === cell.id && 'text-foreground',
														'ml-2 h-4 w-4'
													)}
												/>
											</Button>
										{/if}
									</TableHead>
								</Subscribe>
							{/each}
						</TableRow>
					</Subscribe>
				{/each}
			</TableHeader>
			<TableBody {...$tableBodyAttrs}>
				{#each $pageRows as row (row.id)}
					<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
						<TableRow {...rowAttrs} data-state={$selectedDataIds[row.id] && 'selected'}>
							{#each row.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs>
									<TableCell {...attrs}>
										<Render of={cell.render()} />
									</TableCell>
								</Subscribe>
							{/each}
						</TableRow>
					</Subscribe>
				{/each}
			</TableBody>
		</Table>
	</div>
	<div class="flex items-center justify-end space-x-2 py-4">
		<Button
			variant="outline"
			size="sm"
			on:click={() => ($pageIndex = $pageIndex - 1)}
			disabled={!$hasPreviousPage}>Previous</Button
		>
		<Button
			variant="outline"
			size="sm"
			disabled={!$hasNextPage}
			on:click={() => ($pageIndex = $pageIndex + 1)}>Next</Button
		>
	</div>
</div>
