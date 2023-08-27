<script lang="ts">
	import type { ProductAttribute } from '$lib/api/types';
	import { Button } from '$lib/components/ui/button';
	import * as Table from '$lib/components/ui/table';
	import { t } from '$lib/i18n';
	import type { ProductSchema, ProductZodSchema } from '$lib/schemas/product';
	import { uniqueId } from 'lodash';
	import { AlertTriangle, Plus } from 'lucide-svelte';
	import { derived, type Writable } from 'svelte/store';
	import type { ValidationErrors } from 'sveltekit-superforms';
	import type { LocalProductAttribute } from '../types';
	import AttributesTableRow from './attributes-table-row.svelte';

	export let attributes: ProductAttribute[];
	export let attributesField: Writable<ProductSchema['attributes']>;
	export let attributesErrors: ValidationErrors<ProductZodSchema>['attributes'];

	const addNewProductAttribute = () => {
		$attributesField = [...$attributesField, { values: [], key: uniqueId() } as any];
	};

	const updateProductAttribute = (e: CustomEvent<{ data: LocalProductAttribute }>) => {
		const { data } = e.detail;
		const updatedAttrIndex = $attributesField.findIndex((attr) => attr.key === data.key);
		if (updatedAttrIndex === -1) return;
		const newAttributes = [...$attributesField];
		newAttributes[updatedAttrIndex] = data;
		$attributesField = newAttributes;
	};

	const deleteProductAttribute = (e: CustomEvent<string>) => {
		$attributesField = $attributesField.filter(({ key }) => key !== e.detail);
	};

	const selectableAttributes = derived(
		[attributesField],
		([$attributesField]) =>
			attributes?.filter((attr) => !$attributesField.map(({ id }) => id).includes(attr.id)) ?? []
	);
</script>

{#if attributesErrors?._errors?.length}
	<div class="flex flex-row gap-2 p-2 border border-destructive">
		<AlertTriangle class="text-destructive" />
		<span class="text-destructive">
			{attributesErrors?._errors?.join(',')}
		</span>
	</div>
{/if}

<Table.Root>
	<Table.Header>
		<Table.Row>
			<Table.Head class="w-4/12">{$t('entity.attribute.singular.lowercase')}</Table.Head>
			<Table.Head class="w-5/12">{$t('common.word.options.lowercase')}</Table.Head>
			<Table.Head class="w-1/12">{$t('common.word.optional.lowercase')}</Table.Head>
			<Table.Head class="w-1/12" />
		</Table.Row>
	</Table.Header>

	<Table.Body>
		{#each $attributesField as { key }, index (key)}
			<AttributesTableRow
				{key}
				{selectableAttributes}
				errors={attributesErrors?.[index]?.values?._errors}
				on:change={updateProductAttribute}
				on:delete={deleteProductAttribute}
			/>
		{/each}
	</Table.Body>
</Table.Root>

<Button type="button" variant="link" on:click={addNewProductAttribute}>
	<Plus class="mr-2 h-4 w-4" />
	{$t('common.word.add.capitalize')}
</Button>
