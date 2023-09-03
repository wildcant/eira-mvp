<script lang="ts">
	import type { EditableRowState } from '$components/crud-data-table';
	import type { ProductAttribute } from '$lib/api/types';
	import TagsInputAutocomplete from '$lib/components/custom/tags-input-autocomplete/tags-input-autocomplete.svelte';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import type { Tag } from '@melt-ui/svelte';
	import { effect } from '@melt-ui/svelte/internal/helpers';
	import type { DataBodyRow } from 'svelte-headless-table';
	import { derived, writable } from 'svelte/store';

	export let row: DataBodyRow<ProductAttribute>;
	export let editableRow: EditableRowState<ProductAttribute>;

	$: defaultTags = row.original.values?.map((v) => v.name) ?? [];

	const { editingRow, editing, updatedRow } = editableRow;

	$: isEditingCell = $editing && $editingRow?.id === row.id;

	let allowedTags: Tag[] = [];
	const tags = writable<Tag[]>();

	const selectedAttribute = derived(updatedRow, ($updatedRow) => $updatedRow?.attribute?.id);
	const selectedAttributeValues = derived(
		updatedRow,
		($updatedRow) => $updatedRow?.attribute?.values
	);

	$: if (
		$editingRow &&
		$editingRow.isData() &&
		$editingRow.original.attribute?.id === $selectedAttribute
	) {
		$tags =
			$editingRow?.original.values.map(({ id, name }) => ({ id: id.toString(), value: name })) ??
			[];
	}

	$: if (isEditingCell && $selectedAttributeValues) {
		allowedTags =
			$selectedAttributeValues.map((v) => ({
				id: v.id.toString(),
				value: v.name
			})) ?? [];
	}

	effect(selectedAttribute, () => tags.set([]));
	effect(tags, ($tags) => {
		if (!$updatedRow) return;
		$updatedRow.values = $tags.map(
			(tag) => ({ id: +tag.id, name: tag.value } as ProductAttribute['values'][number])
		);
	});
</script>

{#if isEditingCell && $updatedRow}
	<TagsInputAutocomplete {allowedTags} {defaultTags} {tags} />
{:else}
	<div class="flex flex-row gap-2 flex-wrap">
		{#each defaultTags as tag}
			<Badge>{tag}</Badge>
		{/each}
	</div>
{/if}
