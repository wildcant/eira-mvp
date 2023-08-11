<script lang="ts">
	import { CrudDataTable, type CrudTableColumns } from '$components/crud-data-table';
	import type { ProductsAttribute } from '$lib/api/types';
	import { t } from '$lib/i18n';
	import { productsAttributeSchema } from '$lib/schemas/products-attribute';
	import { createRender } from 'svelte-headless-table';
	import NewProductsAttributeForm from './components/new-products-attribute-form.svelte';

	export let data;
	const { initialData, endpoint, form } = data;

	const title = $t('entity.attribute.plural.capitalize');

	const columns: CrudTableColumns<ProductsAttribute> = [
		{ header: $t('common.word.name.capitalize'), accessor: 'name', meta: { class: 'w-8/12' } },
		{
			header: $t('common.phrase.unit-of-measure'),
			accessor: 'unitOfMeasure',
			meta: { class: 'w-3/12' }
		}
	];

	const createForm = {
		form,
		validators: $productsAttributeSchema,
		component: createRender(NewProductsAttributeForm)
	};
</script>

<CrudDataTable entity="attribute" {initialData} {columns} {title} {endpoint} {createForm} />
