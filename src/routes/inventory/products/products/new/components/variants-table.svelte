<script lang="ts">
	import { UNEXPECTED_ROW_TYPE } from '$components/crud-data-table';
	import type { ProductAttribute } from '$lib/api/types';
	import DataTable from '$lib/components/custom/data-table/data-table.svelte';
	import { openConfirmationModal } from '$lib/components/custom/modal/actions';
	import * as Table from '$lib/components/ui/table';
	import { t } from '$lib/i18n';
	import type { ProductVariantSchema, VariantAttributeSchema } from '$lib/schemas';
	import { toString } from 'lodash';
	import { createRender, createTable } from 'svelte-headless-table';
	import { addHiddenColumns, addSortBy } from 'svelte-headless-table/plugins';
	import type { Writable } from 'svelte/store';
	import VariantImage from './variant-image.svelte';

	export let data: Writable<ProductVariantSchema[]>;
	export let attributes: ProductAttribute[];
	export let variantAttributes: VariantAttributeSchema[];

	export const table = createTable(data, {
		sort: addSortBy({ disableMultiSort: true }),
		hide: addHiddenColumns()
	});

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
					const attr = variantAttributes.find(({ id }) => id === attribute.id);
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
					.on('edit', console.log)
					.on('delete', (event) =>
						openConfirmationModal({
							id: 'delete-row',
							title: $t('common.phrase.confirm-remove'),
							onConfirm: () => console.log(event)
						})
					);
			},
			plugins: { sort: { disable: true } }
		})
	]);

	const viewModel = table.createViewModel(columns);
	const { pluginStates } = viewModel;
	const { hiddenColumnIds } = pluginStates.hide;

	$: $hiddenColumnIds = attributes
		.map(({ id }) => id)
		.filter((attrId) => !variantAttributes.map(({ id }) => id).includes(attrId))
		.map(toString);
</script>

<DataTable {viewModel} class="min-h-[600px]" />
