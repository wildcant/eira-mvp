<script lang="ts">
	import Search from '$components/shared/search/Search.svelte';
	import PaymentsTable from '../../../demo/PaymentsTable.svelte';

	const departments = [];
	let value = '';
</script>

<h2>{departments.length} Product Departments</h2>

<Search bind:value />
