<script lang="ts">
	import { samples, type Person } from '$lib/demos/samples';
	import EditableTable from './EditableTable.svelte';

	const data = samples.slice(0, 10);

	const columns: Array<{ header: string; accessor: keyof Person }> = [
		{ header: 'First Name', accessor: 'firstName' },
		{ header: 'Last Name', accessor: 'lastName' },
		{ header: 'Age', accessor: 'age' },
		{ header: 'Status', accessor: 'status' },
		{ header: 'Visits', accessor: 'visits' },
		{ header: 'Profile Progress', accessor: 'progress' }
	];
</script>

<EditableTable {data} {columns} />
