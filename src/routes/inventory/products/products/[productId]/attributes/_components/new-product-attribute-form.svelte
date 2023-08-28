<script lang="ts">
	import type { ProductAttribute } from '$lib/api/types';
	import * as Autocomplete from '$lib/components/custom/autocomplete';
	import * as Form from '$lib/components/custom/form';
	import { t } from '$lib/i18n';
	import { writable } from 'svelte/store';
	import type { AttributeItem } from '../../../new/types';

	export let attributes: ProductAttribute[];

	// TODO: Filter already chosen attributes.
	$: options = attributes?.map((attr) => ({
		value: attr.id,
		label: attr.name,
		meta: { values: attr.values }
	})) satisfies AttributeItem[];
	let selectedAttribute = writable<AttributeItem>();
	// const extractValues = (e: CustomEvent<Tag[]>) => e.detail?.map((tag) => tag.value);
</script>

<Form.Field name="name">
	<Form.Label>
		{$t('common.word.name.capitalize')}
	</Form.Label>
	<Autocomplete.Root class="max-w-xs" bind:value={$selectedAttribute}>
		<div class="cursor-pointer">
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

<!--
<Form.Field name="unitOfMeasure">
	<Form.Label>
		{$t('common.phrase.unit-of-measure')}
	</Form.Label>
	<Form.Input type="text" />
</Form.Field>

<Form.Field name="values" let:field let:invalid>
	<Form.Label>
		{$t('common.word.values.capitalize')}
	</Form.Label>

	<TagsInput {invalid} on:change={(e) => field.setValue(extractValues(e))} />
</Form.Field>
-->
