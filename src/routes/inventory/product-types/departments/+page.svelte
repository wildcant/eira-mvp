<script lang="ts">
	import { openCustomModal } from '$components/shared/modal/ModalsManager.svelte';
	import Search from '$components/shared/search/Search.svelte';
	import Button from '$components/ui/button/Button.svelte';
	import type { DatabaseTypes } from '$lib/database/types';
	import { t } from '$lib/i18n';
	import type { PaginatedApiResponse } from '$lib/types';
	import debounce from 'lodash/debounce';
	import { Plus } from 'lucide-svelte';
	import DepartmentsTable from './components/DepartmentsTable.svelte';
	import NewDepartmentModal, {
		NEW_DEPARTMENT_MODAL_ID
	} from './components/NewDepartmentModal.svelte';
	import { newDepartmentFormState } from './store';

	export let data;
	const { departmentsJson: initial, newDepartmentForm } = data;
	newDepartmentFormState.set(newDepartmentForm);

	let departments = initial.data;
	let hasMore = initial.meta.hasMore;
	let after = initial.meta.afterCursor;
	let loading = false;

	function reset() {
		departments = initial.data;
		hasMore = initial.meta.hasMore;
		after = initial.meta.afterCursor;
	}

	async function searchDepartments(search: string) {
		if (loading) return;
		loading = true;
		const response = await fetch(`/api/products/departments.json?search=${search}`);
		const result = (await response.json()) as PaginatedApiResponse<DatabaseTypes['Department']>;
		departments = result.data;
		hasMore = result.meta.hasMore;
		after = result.meta.afterCursor;
		loading = false;
	}

	const handleSearchChanged = debounce((event: Event) => {
		const search = (event.target as HTMLInputElement).value;
		if (search) searchDepartments(search);
		else reset();
	}, 300);

	async function loadMore() {
		if (loading || !hasMore) return;
		loading = true;
		const response = await fetch(`/api/products/departments.json?after=${after}&size=6`);
		const result = (await response.json()) as PaginatedApiResponse<DatabaseTypes['Department']>;
		departments = departments.concat(result.data);
		hasMore = result.meta.hasMore;
		after = result.meta.afterCursor;
		loading = false;
	}
</script>

<div>
	<div class="mb-4 flex justify-between items-center">
		<h2>
			{initial.meta.total}
			{$t('entity.product.singular.capitalize')}
			{$t('entity.department.plural.lowercase')}
		</h2>

		<Button
			variant="outline"
			class="min-w-fit"
			on:click={() =>
				openCustomModal({
					id: NEW_DEPARTMENT_MODAL_ID,
					title: `${$t('common.word.new.capitalize')} ${$t(
						'entity.department.singular.lowercase'
					)}`,
					children: NewDepartmentModal
				})}
		>
			<Plus class="h-4 w-4 md:mr-2" />
			<span class="hidden md:inline">
				{$t('common.word.new.capitalize')}
				{$t('entity.department.singular.lowercase')}
			</span>
		</Button>
	</div>

	<Search on:input={handleSearchChanged} on:reset={reset} />

	<DepartmentsTable bind:departments on:more={loadMore} />
</div>
