<script lang="ts">
	import { openCustomModal } from '$components/shared/modal/ModalsManager.svelte';
	import Search from '$components/shared/search/Search.svelte';
	import Button from '$components/ui/button/Button.svelte';
	import type { DatabaseTypes } from '$lib/database/types';
	import { t } from '$lib/i18n';
	import type { PaginatedApiResponse } from '$lib/types';
	import debounce from 'lodash/debounce';
	import { Plus } from 'lucide-svelte';
	import CategoriesTable from './components/CategoriesTable.svelte';
	import NewCategoryModal, { NEW_CATEGORY_MODAL_ID } from './components/NewCategoryModal.svelte';
	import { newCategoryFormState } from './store';

	export let data;
	const { categoriesJson: initial, newCategoryForm, departments } = data;
	newCategoryFormState.set({ form: newCategoryForm, departments });

	let categories = initial.data;
	let hasMore = initial.meta.hasMore;
	let after = initial.meta.afterCursor;
	let loading = false;

	function reset() {
		categories = initial.data;
		hasMore = initial.meta.hasMore;
		after = initial.meta.afterCursor;
	}

	async function searchCategories(search: string) {
		if (loading) return;
		loading = true;
		const response = await fetch(`/api/products/categories.json?search=${search}`);
		const result = (await response.json()) as PaginatedApiResponse<DatabaseTypes['Category']>;
		categories = result.data;
		hasMore = result.meta.hasMore;
		after = result.meta.afterCursor;
		loading = false;
	}

	const handleSearchChanged = debounce((event: Event) => {
		const search = (event.target as HTMLInputElement).value;
		if (search) searchCategories(search);
		else reset();
	}, 300);

	async function loadMore() {
		if (loading || !hasMore) return;
		loading = true;
		const response = await fetch(`/api/products/categories.json?after=${after}&size=6`);
		const result = (await response.json()) as PaginatedApiResponse<DatabaseTypes['Category']>;
		categories = categories.concat(result.data);
		hasMore = result.meta.hasMore;
		after = result.meta.afterCursor;
		loading = false;
	}
</script>

<div>
	<div class="mb-4 flex justify-between items-center">
		<h2>{initial.meta.total} {$t('entity.category.plural.capitalize')}</h2>

		<Button
			variant="outline"
			class="min-w-fit"
			on:click={() =>
				openCustomModal({
					id: NEW_CATEGORY_MODAL_ID,
					title: `${$t('common.word.new.capitalize')} ${$t('entity.category.singular.lowercase')}`,
					children: NewCategoryModal
				})}
		>
			<Plus class="h-4 w-4 md:mr-2" />
			<span class="hidden md:inline">
				{$t('common.word.new.capitalize')}
				{$t('entity.category.singular.lowercase')}
			</span>
		</Button>
	</div>
</div>

<Search on:input={handleSearchChanged} on:reset={reset} />

<CategoriesTable bind:categories on:more={loadMore} />
