<script lang="ts">
	import type { EditableRowState } from '$components/crud-data-table';
	import type { Product, ProductAttributeValue } from '$lib/api/types';
	import TagsInput from '$lib/components/custom/tags-input/tags-input.svelte';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import type { Tag } from '@melt-ui/svelte';
	import type { DataBodyRow } from 'svelte-headless-table';

	type A = NonNullable<Product['attributes']>[number];
	export let row: DataBodyRow<A>;
	export let editableRow: EditableRowState<A>;
	$: defaultTags = row.original.values?.map((v) => v.name) ?? [];

	const { editingRow, editing, updatedRow } = editableRow;
	$: isEditingCell = $editing && $editingRow?.id === row.id;

	const updateRowAttributeValues = (e: CustomEvent<Tag[]>) => {
		if (!$updatedRow) return;
		$updatedRow.values = e.detail.map((tag) => ({ name: tag.value } as ProductAttributeValue));
	};
</script>

{#if isEditingCell && $updatedRow}
	<TagsInput {defaultTags} on:change={updateRowAttributeValues} />
{:else}
	<div class="flex flex-row gap-2 flex-wrap">
		{#each defaultTags as tag}
			<Badge>{tag}</Badge>
		{/each}
	</div>
{/if}
