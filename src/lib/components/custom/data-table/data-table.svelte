<script lang="ts" generics="TItem, TPlugins extends AnyPlugins">
	import { Button } from '$lib/components/ui/button';

	import * as Table from '$lib/components/ui/table';
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
</script>

<div class={cn('relative', className)}>
	<div class="rounded-md border">
		<Table.Root {...$tableAttrs}>
			<Table.Header>
				{#each $headerRows as headerRow (headerRow.id)}
					<Subscribe rowAttrs={headerRow.attrs()} let:rowAttrs>
						<Table.Row {...rowAttrs}>
							{#each headerRow.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
									<Table.Head {...attrs} class={cn(!props.sort.disabled && 'pl-1')}>
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
									</Table.Head>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Header>
			<Table.Body {...$tableBodyAttrs}>
				{#each $pageRows as row (row.id)}
					<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
						<Table.Row {...rowAttrs}>
							<!-- data-state={$selectedDataIds[row.id] && 'selected'} -->
							{#each row.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs>
									<Table.Cell {...attrs}>
										<Render of={cell.render()} />
									</Table.Cell>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Body>
		</Table.Root>
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
