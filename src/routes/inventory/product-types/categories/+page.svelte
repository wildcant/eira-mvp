<script lang="ts">
	import {
		CrudDataTable,
		UNEXPECTED_ROW_TYPE,
		type CrudTableColumns
	} from '$components/crud-data-table';
	import type { Category } from '$lib/api/types';
	import { t } from '$lib/i18n';
	import { categorySchema } from '$lib/schemas/category';
	import { createRender } from 'svelte-headless-table';
	import EditableDepartmentCell from './_components/editable-department-cell.svelte';
	import NewCategoryForm from './_components/new-category-form.svelte';

	export let data;
	const { initialData, endpoint, departments, form } = data;

	const title = $t('entity.category.plural.capitalize');

	const columns: CrudTableColumns<Category> = [
		{ header: $t('common.word.name.capitalize'), accessor: 'name', meta: { class: 'w-8/12' } },
		{
			header: $t('entity.department.singular.capitalize'),
			accessor: 'departmentId',
			cell: ({ row }, { pluginStates: { editableRow } }) => {
				if (!row.isData()) throw new Error(UNEXPECTED_ROW_TYPE);
				return createRender(EditableDepartmentCell, { row, editableRow, departments });
			},
			meta: { class: 'w-3/12' }
		}
	];

	const create = {
		form,
		validators: $categorySchema,
		component: createRender(NewCategoryForm, { departments })
	};
</script>

<CrudDataTable entity="category" {title} {columns} {initialData} {endpoint} {create} />
