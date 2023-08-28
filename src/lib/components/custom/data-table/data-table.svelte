<script lang="ts" generics="TItem, TPlugins extends AnyPlugins">
	import Scroller from '../scroller/scroller.svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Table from '$lib/components/ui/table';
	// import { t } from '$lib/i18n';
	import { cn } from '$lib/utils';
	import { ArrowUpDown } from 'lucide-svelte';
	import { Render, Subscribe, type TableViewModel } from 'svelte-headless-table';
	import type { AnyPlugins } from 'svelte-headless-table/lib/types/TablePlugin';

	export let viewModel: TableViewModel<TItem, TPlugins>;
	let className: string | undefined | null = undefined;
	export { className as class };

	const { headerRows, rows, tableAttrs, tableBodyAttrs /*, pluginStates */ } = viewModel;
	// const { sortKeys } = pluginStates.sort;
	// const { selectedDataIds, allRowsSelected } = pluginStates.select;
</script>

<div class="relative mt-4">
	<Scroller class={className} on:more>
		<Table.Root {...$tableAttrs} class="border-collapse">
			<Table.Header class="sticky top-0 bg-background z-10">
				{#each $headerRows as headerRow (headerRow.id)}
					<Subscribe rowAttrs={headerRow.attrs()} let:rowAttrs>
						<Table.Row {...rowAttrs}>
							{#each headerRow.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
									<!-- class={cn(!props.sort.disabled && 'pl-1')} -->
									<Table.Head {...attrs}>
										<!-- {#if props.sort.disabled} -->
										<Render of={cell.render()} />
										<!-- 
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
										-->
									</Table.Head>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Header>
			<Table.Body {...$tableBodyAttrs}>
				{#each $rows as row (row.id)}
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
	</Scroller>
</div>
