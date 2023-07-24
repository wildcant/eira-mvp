<script lang="ts" generics="TItem, TPlugins extends AnyPlugins">
	import Button from '$components/ui/button/Button.svelte';
	import Table from '$components/ui/table/Table.svelte';
	import TableBody from '$components/ui/table/TableBody.svelte';
	import TableCell from '$components/ui/table/TableCell.svelte';
	import TableHead from '$components/ui/table/TableHead.svelte';
	import TableHeader from '$components/ui/table/TableHeader.svelte';
	import TableRow from '$components/ui/table/TableRow.svelte';
	import { t } from '$lib/i18n';
	import { cn } from '$lib/utils';
	import { ArrowUpDown } from 'lucide-svelte';
	import { Render, Subscribe, type TableViewModel } from 'svelte-headless-table';
	import type { AnyPlugins } from 'svelte-headless-table/lib/types/TablePlugin';

	export let viewModel: TableViewModel<TItem, TPlugins>;
	let className: string | undefined | null = undefined;
	export { className as class };

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } = viewModel;
	const { sortKeys } = pluginStates.sort;
	const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page;

	const { selectedDataIds, allRowsSelected } = pluginStates.select;
	// TODO: Finish row selection implementation.
	$: console.log($selectedDataIds);
</script>

<div class={cn('relative', className)}>
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
											<Button
												variant="ghost"
												on:click={props.sort.toggle}
												class="p-2 uppercase font-bold text-xs"
											>
												<Render of={cell.render()} />
												<ArrowUpDown
													class={cn(
														$sortKeys[0]?.id === cell.id && 'text-foreground',
														'ml-2  h-3 w-3'
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
	<div class="absolute flex items-center justify-end space-x-2 py-4 right-4 bottom-0">
		<Button
			variant="outline"
			size="sm"
			on:click={() => ($pageIndex = $pageIndex - 1)}
			disabled={!$hasPreviousPage}>{$t('component.table.pagination.previous')}</Button
		>
		<Button
			variant="outline"
			size="sm"
			disabled={!$hasNextPage}
			on:click={() => ($pageIndex = $pageIndex + 1)}>{$t('component.table.pagination.next')}</Button
		>
	</div>
</div>
