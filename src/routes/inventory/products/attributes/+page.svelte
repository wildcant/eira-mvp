<script lang="ts">
	import {
		CrudDataTable,
		UNEXPECTED_ROW_TYPE,
		type Create,
		type CrudTableColumns,
		type Update
	} from '$components/crud-data-table';
	import type { ProductsAttribute } from '$lib/api/types';
	import { t } from '$lib/i18n';
	import {
		productsAttributeSchema,
		type ProductsAttributeSchema
	} from '$lib/schemas/products-attribute';
	import { createRender } from 'svelte-headless-table';
	import EditableAttributesValuesCell from './components/editable-attributes-values-cell.svelte';
	import NewProductsAttributeForm from './components/new-products-attribute-form.svelte';

	export let data;
	const { initialData, endpoint, form } = data;

	const title = $t('entity.attribute.plural.capitalize');

	const columns: CrudTableColumns<ProductsAttribute> = [
		{ header: $t('common.word.name.capitalize'), accessor: 'name', meta: { class: 'w-4/12' } },
		{
			header: $t('common.phrase.unit-of-measure'),
			accessor: 'unitOfMeasure',
			meta: { class: 'w-2/12' }
		},
		{
			header: $t('common.word.values.capitalize'),
			accessor: 'values',
			cell: ({ row }, { pluginStates: { editableRow } }) => {
				if (!row.isData()) throw new Error(UNEXPECTED_ROW_TYPE);

				return createRender(EditableAttributesValuesCell, {
					row,
					editableRow
				});
			},
			meta: { class: 'w-6/12' }
		}
	];

	const create: Create = {
		form,
		validators: $productsAttributeSchema,
		component: createRender(NewProductsAttributeForm)
	};

	const update: Update<ProductsAttribute, ProductsAttributeSchema> = {
		dto: (row) => ({
			name: row.name,
			unitOfMeasure: row.unitOfMeasure ?? '',
			values: row.values?.map(({ name }) => name) ?? []
		})
	};
</script>

<CrudDataTable entity="attribute" {initialData} {columns} {title} {endpoint} {create} {update} />
