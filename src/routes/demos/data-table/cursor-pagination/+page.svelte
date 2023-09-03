<script lang="ts">
	import type { Person } from '$lib/demos/samples';
	import EntityTable from './entity-table.svelte';

	export let data;
	const { apiResponse } = data;
	const columns: Array<{ header: string; accessor: keyof Person }> = [
		{ header: 'First Name', accessor: 'firstName' },
		{ header: 'Last Name', accessor: 'lastName' },
		{ header: 'Age', accessor: 'age' },
		{ header: 'Status', accessor: 'status' },
		{ header: 'Visits', accessor: 'visits' },
		{ header: 'Profile Progress', accessor: 'progress' }
	];
</script>

<EntityTable {apiResponse} {columns} endpoint="/api/demos/cursor/people.json" />
