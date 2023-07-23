<script lang="ts">
	import Search from '$components/shared/search/Search.svelte';
	import Button from '$components/ui/button/Button.svelte';
	import type { DatabaseTypes } from '$lib/database/types';
	import type { PaginatedApiResponse } from '$lib/types';
	import debounce from 'lodash/debounce';
	import { Plus } from 'lucide-svelte';
	import type { PageData } from './$types';
	import DepartmentsTable from './components/DepartmentsTable.svelte';
	import NewDepartmentModal, {
		NEW_DEPARTMENT_MODAL_ID
	} from './components/NewDepartmentModal.svelte';
	import { openCustomModal } from '$components/shared/modal/ModalsManager.svelte';

	export let data: PageData;

	let departments = data.data;
	let hasMore = data.meta.hasMore;
	let after = data.meta.afterCursor;
	let loading = false;

	function reset() {
		departments = data.data;
		hasMore = data.meta.hasMore;
		after = data.meta.afterCursor;
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
		<h2>{data.meta.total} Product departments</h2>

		<Button
			variant="outline"
			on:click={() =>
				openCustomModal({
					id: NEW_DEPARTMENT_MODAL_ID,
					title: 'New department',
					children: NewDepartmentModal
				})}
		>
			<Plus class="h-4 w-4 md:mr-2" />
			<span class="hidden md:inline">New department</span>
		</Button>
	</div>

	<Search on:input={handleSearchChanged} on:reset={reset} />

	<DepartmentsTable bind:departments on:more={loadMore} />
</div>
