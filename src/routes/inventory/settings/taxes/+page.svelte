<script lang="ts">
	import {
		CrudDataTable,
		UNEXPECTED_ROW_TYPE,
		type Create,
		type CrudTableColumns
	} from '$components/crud-data-table';
	import type { Tax } from '$lib/api/types';
	import { t } from '$lib/i18n';
	import { taxAmountSuffix, taxSchema, type TaxSchema } from '$lib/schemas/tax';
	import { createRender } from 'svelte-headless-table';
	import EditableTaxScopeCell from './components/editable-tax-scope-cell.svelte';
	import EditableTaxTypeCell from './components/editable-tax-type-cell.svelte';
	import NewTaxForm from './components/new-tax-form.svelte';

	export let data;
	const { initialData, endpoint, form } = data;

	const title = $t('entity.tax.plural.capitalize');

	const columns: CrudTableColumns<Tax> = [
		{ header: $t('common.word.name.capitalize'), accessor: 'name', meta: { class: 'w-4/12' } },
		{
			header: $t('common.word.value.capitalize'),
			accessor: 'amount',
			accessorFn: ({ type, amount }) =>
				`${amount}${taxAmountSuffix({ $t })[type as TaxSchema['type']] ?? ''}`,
			meta: { class: 'w-2/12' }
		},
		{
			header: $t('common.word.scope.capitalize'),
			accessor: 'scope',
			cell: ({ row }, { pluginStates: { editableRow } }) => {
				if (!row.isData()) throw new Error(UNEXPECTED_ROW_TYPE);
				return createRender(EditableTaxScopeCell, { row, editableRow });
			},
			meta: { class: 'w-3/12' }
		},
		{
			header: $t('common.word.type.capitalize'),
			accessor: 'type',
			cell: ({ row }, { pluginStates: { editableRow } }) => {
				if (!row.isData()) throw new Error(UNEXPECTED_ROW_TYPE);
				return createRender(EditableTaxTypeCell, { row, editableRow });
			},
			meta: { class: 'w-3/12' }
		}
	];

	const create: Create = {
		form,
		validators: $taxSchema,
		component: createRender(NewTaxForm)
	};
</script>

<CrudDataTable entity="tax" {initialData} {columns} {title} {endpoint} {create} />
