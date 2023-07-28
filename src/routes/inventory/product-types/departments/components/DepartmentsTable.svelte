<script lang="ts">
	import Scroller from '$components/shared/scroller/Scroller.svelte';
	import Table from '$components/ui/table/Table.svelte';
	import TableBody from '$components/ui/table/TableBody.svelte';
	import TableHead from '$components/ui/table/TableHead.svelte';
	import TableHeader from '$components/ui/table/TableHeader.svelte';
	import TableRow from '$components/ui/table/TableRow.svelte';
	import type { Department } from '$lib/api/types';
	import { t } from '$lib/i18n';
	import DepartmentsEditActions from './DepartmentsEditActions.svelte';
	import DepartmentsRow from './DepartmentsRow.svelte';

	export let departments: Department[];
</script>

<div class="relative mt-4">
	<Scroller on:more>
		<Table class="border-collapse">
			<TableHeader class="sticky top-0 bg-zin bg-white dark:bg-zinc-950 z-10">
				<TableRow>
					<TableHead class="w-8/12">{$t('common.word.name.capitalize')}</TableHead>
					<TableHead class="w-3/12">{$t('common.word.color.capitalize')}</TableHead>
					<TableHead class="w-1/12" />
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
	</Scroller>
</div>

<DepartmentsEditActions />
