<script lang="ts">
	import Scroller from '$components/shared/scroller/Scroller.svelte';
	import Table from '$components/ui/table/Table.svelte';
	import TableBody from '$components/ui/table/TableBody.svelte';
	import TableHead from '$components/ui/table/TableHead.svelte';
	import TableHeader from '$components/ui/table/TableHeader.svelte';
	import TableRow from '$components/ui/table/TableRow.svelte';
	import type { DatabaseTypes } from '$lib/database/types';
	import { t } from '$lib/i18n';
	import CategoriesEditActions from './CategoriesEditActions.svelte';
	import CategoriesRow from './CategoriesRow.svelte';

	export let categories: DatabaseTypes['Category'][];
</script>

<div class="relative mt-4">
	<Scroller on:more>
		<Table class="border-collapse">
			<TableHeader class="sticky top-0 bg-zin bg-white dark:bg-zinc-950">
				<TableRow>
					<TableHead>{$t('common.word.name.capitalize')}</TableHead>
					<TableHead>
						{$t('entity.department.singular.capitalize')}
					</TableHead>
					<TableHead class="w-2" />
				</TableRow>
			</TableHeader>
			<TableBody>
				{#each categories as category (category.id)}
					<CategoriesRow
						{category}
						on:deleted={() => (categories = categories.filter(({ id }) => id !== category.id))}
					/>
				{/each}
			</TableBody>
		</Table>
	</Scroller>
</div>

<CategoriesEditActions />
