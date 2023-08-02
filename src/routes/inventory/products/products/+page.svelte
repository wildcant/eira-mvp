<script lang="ts">
	import ProductsTable from './components/ProductsTable.svelte';

	export let data;
	const { initialData } = data;
</script>

<ProductsTable {initialData} />
