<script lang="ts">
	// import { CrudDataTable } from '$components/crud-data-table';
	import type { CrudTableColumns } from '$components/crud-data-table/types';
	import type { ProductVariant } from '$lib/api/types';
	import { t } from '$lib/i18n';

	// export let data;

	const columns: CrudTableColumns<ProductVariant> = [
		{ header: 'SLU', accessor: 'sku', meta: { class: 'w-8/12' } },
		{
			header: $t('common.phrase.unit-of-measure'),
			accessor: 'sku',
			meta: { class: 'w-3/12' }
		}
	];
</script>

<!-- <CrudDataTable title="Variants" columns={} /> -->
