<script lang="ts">
	import Table from '$components/ui/table/Table.svelte';
	import TableBody from '$components/ui/table/TableBody.svelte';
	import TableHead from '$components/ui/table/TableHead.svelte';
	import TableHeader from '$components/ui/table/TableHeader.svelte';
	import TableRow from '$components/ui/table/TableRow.svelte';
	import type { DatabaseTypes } from '$lib/database/types';
	import { createEventDispatcher } from 'svelte';
	import DepartmentsEditActions from './DepartmentsEditActions.svelte';
	import DepartmentsRow from './DepartmentsRow.svelte';

	export let departments: DatabaseTypes['Department'][];

	const dispatch = createEventDispatcher();

	function handleScroll(event: Event) {
		const target = event.target as HTMLInputElement;
		let scrollBottom = target.scrollHeight - target.scrollTop - target.clientHeight;
		if (scrollBottom < 200) dispatch('more');
	}
</script>

<div class="relative mt-4">
	<div class="rounded-md border h-[448px] overflow-auto" on:scroll={handleScroll}>
		<Table class="border-collapse">
			<TableHeader class="sticky top-0 bg-zin bg-white dark:bg-zinc-950">
				<TableRow>
					<TableHead>Name</TableHead>
					<TableHead>Color</TableHead>
					<TableHead class="w-2" />
				</TableRow>
			</TableHeader>
			<TableBody>
				{#each departments as department (department.id)}
					<DepartmentsRow
						{department}
						on:deleted={() => (departments = departments.filter(({ id }) => id !== department.id))}
					/>
				{/each}
			</TableBody>
		</Table>
	</div>
</div>

<DepartmentsEditActions />
