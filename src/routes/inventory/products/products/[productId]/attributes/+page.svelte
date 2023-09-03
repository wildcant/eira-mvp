<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import CrudDataTable from '$components/crud-data-table/components/crud-data-table.svelte';
	import {
		UNEXPECTED_ROW_TYPE,
		type CrudDataTableProps
	} from '$components/crud-data-table/index.js';
	import type { ProductAttribute } from '$lib/api/types';
	import { t } from '$lib/i18n/index.js';
	import { productAttributeSchema } from '$lib/schemas';
	import { createRender } from 'svelte-headless-table';
	import { writable } from 'svelte/store';
	import EditableProductAttributeCell from './_components/editable-product-attribute-cell.svelte';
	import EditableProductAttributeValuesCell from './_components/editable-product-attribute-values-cell.svelte';
	import NewAttributeForm from './_components/new-product-attribute-form.svelte';

	export let data;

	type CrudAttributeTableProps = CrudDataTableProps<ProductAttribute>;

	const title = $t('entity.product-attribute.plural.capitalize');

	$: availableAttributes = data.allAttributes.filter(
		(attr) => !data.productAttributes.data.map(({ attribute }) => attribute?.id).includes(attr.id)
	);

	let productAttributes = writable<ProductAttribute[]>();
	$: $productAttributes = data.productAttributes.data;
	const columns: CrudAttributeTableProps['columns'] = [
		{
			header: $t('common.word.name.capitalize'),
			accessor: 'attribute',
			cell: ({ row }, { pluginStates: { editableRow } }) => {
				if (!row.isData()) throw new Error(UNEXPECTED_ROW_TYPE);
				return createRender(EditableProductAttributeCell, {
					row,
					editableRow,
					allAttributes: data.allAttributes,
					productAttributes
				});
			},
			meta: { class: 'w-4/12' }
		},
		{
			header: $t('common.word.values.capitalize'),
			accessor: 'values',
			cell: ({ row }, { pluginStates: { editableRow } }) => {
				if (!row.isData()) throw new Error(UNEXPECTED_ROW_TYPE);
				return createRender(EditableProductAttributeValuesCell, {
					row,
					editableRow
				});
			},
			meta: { class: 'w-8/12' }
		}
	];

	$: create = {
		form: data.form,
		validators: $productAttributeSchema,
		// TODO: Nice to have: disable create button when there are no allowed attributes.
		component: createRender(NewAttributeForm, {
			availableAttributes: availableAttributes
		})
	} satisfies CrudAttributeTableProps['create'];
</script>

<CrudDataTable
	entity="product-attribute"
	initialData={data.productAttributes}
	{columns}
	{title}
	endpoint={data.productAttributesEndpoint}
	{create}
	class="xl:h-[28rem]"
	hideSearch
	on:delete={() =>
		// Invalidate the page in order to reload product attributes and update product attribute select with the new available options.
		invalidate(
			(url) => url.pathname === `/inventory/products/products/${$page.params.productId}/attributes`
		)}
/>
