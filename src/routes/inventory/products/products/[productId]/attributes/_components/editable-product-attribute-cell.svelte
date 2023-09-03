<script lang="ts">
	import type { EditableRowState } from '$components/crud-data-table';
	import type { Attribute, ProductAttribute } from '$lib/api/types';
	import * as Autocomplete from '$lib/components/custom/autocomplete';
	import type { DataBodyRow } from 'svelte-headless-table';
	import type { Readable } from 'svelte/motion';
	import { writable } from 'svelte/store';

	export let row: DataBodyRow<ProductAttribute>;
	export let editableRow: EditableRowState<ProductAttribute>;
	export let allAttributes: Attribute[];
	export let productAttributes: Readable<ProductAttribute[]>;

	const { editingRow, editing, updatedRow } = editableRow;
	$: isEditingCell = $editing && $editingRow?.id === row.id;

	$: availableAttributes =
		allAttributes?.filter(
			(attr) =>
				!$productAttributes
					.map(({ attribute }) => attribute?.id)
					.filter(Boolean)
					.filter((id) => id !== row.original.attribute?.id)
					.includes(attr.id)
		) ?? [];

	$: options = (availableAttributes.map((attr) => ({
		value: attr.id,
		label: attr.name,
		meta: attr
	})) ?? []) satisfies Autocomplete.Item<number, Attribute>[];

	let selectedAttribute = writable<Autocomplete.Item<number, Attribute> | undefined>();
	$: if (isEditingCell) {
		$selectedAttribute = options?.find(({ value }) => value === row.original.attribute?.id);
	}

	$: if (isEditingCell && $selectedAttribute && $updatedRow && $selectedAttribute.meta) {
		$updatedRow.attribute = $selectedAttribute.meta;
	}
</script>

{#if isEditingCell && $updatedRow}
	<Autocomplete.Root bind:value={$selectedAttribute}>
		<div>
			<Autocomplete.Input class="capitalize" />
			<Autocomplete.Button />
		</div>

		<Autocomplete.Options>
			{#each options as option, index (index)}
				<Autocomplete.Option class="capitalize" item={option}>
					{option.label}
				</Autocomplete.Option>
			{/each}
		</Autocomplete.Options>
	</Autocomplete.Root>
{:else}
	<span>{row.original.attribute?.name}</span>
{/if}
