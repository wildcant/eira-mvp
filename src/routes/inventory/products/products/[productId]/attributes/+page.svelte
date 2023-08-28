<script lang="ts">
	import CrudDataTable from '$components/crud-data-table/components/crud-data-table.svelte';
	import {
		UNEXPECTED_ROW_TYPE,
		type CrudDataTableProps
	} from '$components/crud-data-table/index.js';
	import type { Product } from '$lib/api/types';
	import { t } from '$lib/i18n/index.js';
	import { productAttributeSchema, type ProductAttributeSchema } from '$lib/schemas';
	import { createRender } from 'svelte-headless-table';
	import AttributeValueCell from './_components/attribute-values-cell.svelte';
	import NewProductAttributeForm from './_components/new-product-attribute-form.svelte';

	export let data;

	type CrudProductAttributeTableProps = CrudDataTableProps<
		NonNullable<Product['attributes']>[number],
		ProductAttributeSchema
	>;

	const title = $t('entity.attribute.plural.capitalize');

	const columns: CrudProductAttributeTableProps['columns'] = [
		{ header: $t('common.word.name.capitalize'), accessor: 'name', meta: { class: 'w-4/12' } },
		{
			header: $t('common.word.values.capitalize'),
			accessor: 'values',
			cell: ({ row }, { pluginStates: { editableRow } }) => {
				if (!row.isData()) throw new Error(UNEXPECTED_ROW_TYPE);

				return createRender(AttributeValueCell, {
					row,
					editableRow
				});
			},
			meta: { class: 'w-8/12' }
		}
	];

	const create: CrudProductAttributeTableProps['create'] = {
		form: data.form,
		validators: $productAttributeSchema,
		component: createRender(NewProductAttributeForm, { attributes: data.allAttributes })
	};

	const update: CrudProductAttributeTableProps['update'] = {
		dto: (row) => ({
			name: row.name,
			unitOfMeasure: row.unitOfMeasure ?? '',
			values: row.values?.map(({ name }) => name) ?? []
		})
	};
</script>

<CrudDataTable
	entity="attribute"
	initialData={{
		data: data.attributes,
		meta: {
			hasMore: false,
			total: data.attributes.length,
			afterCursor: undefined,
			beforeCursor: undefined
		}
	}}
	{columns}
	{title}
	endpoint={data.endpoint}
	{create}
	{update}
	class="h-[424px] 2xl:h-[700px]"
	hideSearch
/>
