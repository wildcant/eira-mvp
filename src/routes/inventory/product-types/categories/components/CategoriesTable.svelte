<script lang="ts">
	import Scroller from '$components/shared/scroller/Scroller.svelte';
	import Table from '$components/ui/table/Table.svelte';
	import TableBody from '$components/ui/table/TableBody.svelte';
	import TableCell from '$components/ui/table/TableCell.svelte';
	import TableHead from '$components/ui/table/TableHead.svelte';
	import TableHeader from '$components/ui/table/TableHeader.svelte';
	import TableRow from '$components/ui/table/TableRow.svelte';
	import type { Category, Department } from '$lib/api/types';
	import { t } from '$lib/i18n';
	import CategoriesEditActions from './CategoriesEditActions.svelte';
	import CategoriesRow from './CategoriesRow.svelte';

	export let categories: Category[];
	export let departmentsPromise: Promise<Department[]>;
</script>

<div class="relative mt-4">
	<Scroller on:more>
		<Table class="border-collapse">
			<TableHeader class="sticky top-0 bg-zin bg-white dark:bg-zinc-950 z-10">
				<TableRow>
					<TableHead class="w-8/12">{$t('common.word.name.capitalize')}</TableHead>
					<TableHead class="w-3/12">
						{$t('entity.department.singular.capitalize')}
					</TableHead>
					<TableHead class="w-1/12" />
				</TableRow>
			</TableHeader>
			<TableBody>
				{#await departmentsPromise}
					<!-- TODO: Display table skeleton, departments are needed only for edit mode so this can be improved! -->
					<TableRow>
						<TableCell>Loading...</TableCell>
					</TableRow>
				{:then departments}
					{#each categories as category (category.id)}
						<CategoriesRow
							{category}
							{departments}
							on:deleted={() => (categories = categories.filter(({ id }) => id !== category.id))}
						/>
					{/each}
				{/await}
			</TableBody>
		</Table>
	</Scroller>
</div>

<CategoriesEditActions />
