<script lang="ts">
	import { UNEXPECTED_ROW_TYPE } from '$components/crud-data-table';
	import type { ProductAttribute, Tax } from '$lib/api/types';
	import DataTable from '$lib/components/custom/data-table/data-table.svelte';
	import {
		closeModal,
		openConfirmationModal,
		openCustomModal
	} from '$lib/components/custom/modal/actions';
	import * as Table from '$lib/components/ui/table';
	import { t } from '$lib/i18n';
	import type { ProductVariantSchema, VariantAttributeSchema } from '$lib/schemas';
	import { toString } from 'lodash';
	import { DataBodyRow, createRender, createTable } from 'svelte-headless-table';
	import { addHiddenColumns, addSortBy } from 'svelte-headless-table/plugins';
	import type { Readable } from 'svelte/motion';
	import VariantForm from './variant-form.svelte';
	import VariantImage from './variant-image.svelte';

	export let data: Readable<ProductVariantSchema[]>;

	export let attributes: ProductAttribute[];
	export let taxes: Tax[];
	export let productAttributes: VariantAttributeSchema[];

	export const table = createTable(data, {
		sort: addSortBy({ disableMultiSort: true }),
		hide: addHiddenColumns()
	});

	const closeEditVariantModal = () => closeModal(EDIT_VARIANT_MODAL_ID);

	const deleteRow = (row: DataBodyRow<ProductVariantSchema>) => {
		if (!row.isData()) {
			console.error("TODO: Handle error can't delete a row that is not data");
			return;
		}

		const rowIndex = $data.findIndex((r) => r.key === row.original.key);
		if (rowIndex === -1) {
			console.error('TODO: Handle error row index not found');
			return;
		}

		$data = $data.slice(0, rowIndex).concat($data.slice(rowIndex + 1));
	};

	const EDIT_VARIANT_MODAL_ID = 'edit-variant-modal';

	export const columns = table.createColumns([
		table.column({
			header: '',
			accessor: 'image',
			cell: ({ value }) => createRender(VariantImage, { src: value?.url }),
			plugins: { sort: { disable: true } }
		}),
		table.column({
			header: 'SKU',
			accessor: 'sku'
		}),
		table.column({
			header: 'Barcode',
			accessor: 'barcode'
		}),
		...attributes.map((attribute) =>
			table.column({
				id: attribute.id.toString(),
				header: attribute.name,
				accessor: `attributes.${attribute.name}` as 'attributes',
				cell: ({ row }) => {
					const attr = productAttributes.find(({ id }) => id === attribute.id);
					if (!row.isData()) throw new Error(UNEXPECTED_ROW_TYPE);
					const attributeValueId = row.original.attributes[attribute.id]?.value;
					if (!attributeValueId) return '';
					const attributeValue = attr?.values.find(({ id }) => attributeValueId === id);
					if (!attributeValue) return '';
					return attributeValue.name;
				},
				plugins: { sort: { disable: true } }
			})
		),
		table.column({
			header: 'cost',
			accessor: 'cost'
		}),
		table.column({
			header: 'price',
			accessor: 'price'
		}),
		table.column({
			header: 'stock',
			accessor: 'stock'
		}),
		table.display({
			id: 'actions',
			header: '',
			cell: ({ row }) => {
				return createRender(Table.ActionsCell, { row })
					.on('edit', (event) =>
						openCustomModal({
							closeOnEscape: false,
							closeOnOutsideClick: false,
							id: EDIT_VARIANT_MODAL_ID,
							title: `
								${$t('common.word.new.capitalize')} 
								${$t(`entity.variant.singular.capitalize`)}
							`,
							children: createRender(VariantForm, {
								mode: 'edit',
								taxes,
								productAttributes,
								defaultValues: event.detail
							})
								.on('cancel', closeEditVariantModal)
								.on('continue', (event: CustomEvent<ProductVariantSchema>) => {
									const rowIndex = $data.findIndex((r) => r.key === event.detail.key);
									if (rowIndex === -1) {
										console.error('TODO: Handle error row index not found');
										return;
									}
									$data[rowIndex] = event.detail;
									closeEditVariantModal();
								}),
							content: { class: 'md:min-w-full lg:min-w-[1024px]' }
						})
					)
					.on('delete', (event) =>
						openConfirmationModal({
							id: 'delete-row',
							title: $t('common.phrase.confirm-remove'),
							onConfirm: () => deleteRow(event.detail)
						})
					);
			},
			plugins: { sort: { disable: true } }
		})
	]);

	const viewModel = table.createViewModel(columns);
	const { pluginStates } = viewModel;
	const { hiddenColumnIds } = pluginStates.hide;

	// Hide attribute columns that are not part of the variant attributes.
	$: $hiddenColumnIds = attributes
		.map(({ id }) => id)
		.filter((attrId) => !productAttributes.map(({ id }) => id).includes(attrId))
		.map(toString);
</script>

<DataTable {viewModel} class="min-h-[600px]" />
