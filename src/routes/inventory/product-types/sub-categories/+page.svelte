<script lang="ts">
	import {
		CrudDataTable,
		UNEXPECTED_ROW_TYPE,
		type CrudTableColumns
	} from '$components/crud-data-table';
	import type { SubCategory } from '$lib/api/types';
	import { t } from '$lib/i18n';
	import { subCategorySchema } from '$lib/schemas/sub-category';
	import { createRender } from 'svelte-headless-table';
	import EditableCategoryCell from './components/editable-category-cell.svelte';
	import NewSubCategoryForm from './components/new-sub-category-form.svelte';

	export let data;
	const { initialData, endpoint, lazy, form } = data;

	const title = $t('entity.sub-category.plural.capitalize');

	const columns: CrudTableColumns<SubCategory> = [
		{ header: $t('common.word.name.capitalize'), accessor: 'name', meta: { class: 'w-8/12' } },
		{
			header: $t('entity.category.singular.capitalize'),
			accessor: 'categoryId',
			cell: ({ row }, { pluginStates: { editableRow } }) => {
				if (!row.isData()) throw new Error(UNEXPECTED_ROW_TYPE);
				return createRender(EditableCategoryCell, {
					row,
					editableRow,
					categoriesPromise: lazy.categories
				});
			},
			meta: { class: 'w-3/12' }
		}
	];

	const createForm = {
		form,
		validators: $subCategorySchema,
		component: createRender(NewSubCategoryForm)
	};
</script>

<CrudDataTable entity="sub-category" {title} {columns} {initialData} {endpoint} {createForm} />
