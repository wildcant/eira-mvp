<script lang="ts">
	import { CrudDataTable, type CrudTableColumns } from '$components/crud-data-table';
	import type { Department } from '$lib/api/types';
	import { t } from '$lib/i18n';
	import { departmentSchema } from '$lib/schemas/department';
	import { createRender } from 'svelte-headless-table';
	import EditableColorCell from './components/editable-color-cell.svelte';
	import NewDepartmentForm from './components/new-department-form.svelte';

	export let data;
	const { initialData, endpoint, form } = data;

	const title = `
		${$t('entity.product.singular.capitalize')}
		${$t('entity.department.plural.lowercase')}
	`;

	const columns: CrudTableColumns<Department> = [
		{ header: $t('common.word.name.capitalize'), accessor: 'name', meta: { class: 'w-8/12' } },
		{
			header: $t('common.word.color.capitalize'),
			accessor: 'color',
			cell: ({ row, id, value }, { pluginStates: { editableRow } }) =>
				createRender(EditableColorCell, {
					row,
					id,
					value,
					editableRow
				}),
			meta: { class: 'w-3/12' }
		}
	];

	const createForm = {
		form,
		validators: $departmentSchema,
		component: createRender(NewDepartmentForm)
	};
</script>

<CrudDataTable entity="department" {initialData} {columns} {title} {endpoint} {createForm} />
