<script lang="ts">
	import type { Attribute } from '$lib/api/types';
	import * as Autocomplete from '$lib/components/custom/autocomplete';
	import * as Form from '$lib/components/custom/form';
	import { getFormContext } from '$lib/components/custom/form/components/form.svelte';
	import TagsInputAutocomplete from '$lib/components/custom/tags-input-autocomplete/tags-input-autocomplete.svelte';
	import { t } from '$lib/i18n';
	import type { ProductAttributeZodSchema } from '$lib/schemas';
	import type { Tag } from '@melt-ui/svelte';
	import { effect } from '@melt-ui/svelte/internal/helpers';
	import { createEventDispatcher } from 'svelte';
	import { writable } from 'svelte/store';

	export let availableAttributes: Attribute[];

	const dispatch = createEventDispatcher();
	const { form } = getFormContext<ProductAttributeZodSchema>();
	const { form: productAttribute } = form;

	let selectedAttribute = writable<Autocomplete.Item<number, Attribute>>();

	$: options = availableAttributes.map((attr) => ({
		value: attr.id,
		label: attr.name,
		meta: attr
	})) satisfies Autocomplete.Item<number, Attribute>[];

	const tags = writable<Tag[]>([]);
	$: allowedTags =
		$selectedAttribute?.meta?.values?.map((v) => ({
			id: v.id.toString(),
			value: v.name
		})) ?? [];

	// Reset tags when the attribute changes.
	effect(selectedAttribute, () => tags.set([]));

	// TODO: Add optional. See attributes-table-row
	effect([selectedAttribute, tags], ([$selectedAttribute, $tags]) => {
		if ($selectedAttribute) {
			dispatch('change', {
				data: {
					id: $selectedAttribute.value,
					name: $selectedAttribute.label,
					values: $tags.map((tag) => ({ id: +tag.id, name: tag.value }))
				}
			});
		}
	});

	$: if ($selectedAttribute?.value) $productAttribute.attribute.id = $selectedAttribute.value;
	$: if ($selectedAttribute?.label) $productAttribute.attribute.name = $selectedAttribute.label;
	$: if ($tags?.length)
		$productAttribute.values = $tags.map((tag) => ({ id: Number(tag.id), name: tag.value }));
</script>

<Form.Field name="id">
	<Form.Label>
		{$t('common.word.name.capitalize')}
	</Form.Label>
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
</Form.Field>

<Form.Field name="values">
	<Form.Label>
		{$t('common.phrase.unit-of-measure')}
	</Form.Label>
	<TagsInputAutocomplete
		{allowedTags}
		{tags}
		disabled={!selectedAttribute || !allowedTags.length}
	/>
</Form.Field>
