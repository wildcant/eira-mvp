<script lang="ts">
	import Search from '$components/shared/search/Search.svelte';
	import Button from '$components/ui/button/Button.svelte';
	import Dialog from '$components/ui/dialog/Dialog.svelte';
	import DialogContent from '$components/ui/dialog/DialogContent.svelte';
	import DialogFooter from '$components/ui/dialog/DialogFooter.svelte';
	import DialogHeader from '$components/ui/dialog/DialogHeader.svelte';
	import DialogTitle from '$components/ui/dialog/DialogTitle.svelte';
	import Input from '$components/ui/input/Input.svelte';
	import Table from '$components/ui/table/Table.svelte';
	import TableBody from '$components/ui/table/TableBody.svelte';
	import TableHead from '$components/ui/table/TableHead.svelte';
	import TableHeader from '$components/ui/table/TableHeader.svelte';
	import TableRow from '$components/ui/table/TableRow.svelte';
	import type { DatabaseTypes } from '$lib/database/types';
	import type { PaginatedApiResponse } from '$lib/types';
	import debounce from 'lodash/debounce';
	import { Plus } from 'lucide-svelte';
	import type { PageData } from './$types';
	import Row from './Row.svelte';

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

	function handleScroll(event: Event) {
		const target = event.target as HTMLInputElement;
		let scrollBottom = target.scrollHeight - target.scrollTop - target.clientHeight;
		if (scrollBottom < 200) loadMore();
	}

	let dialog: Dialog;
</script>

<div>
	<div class="mb-4 flex justify-between items-center">
		<h2>{data.meta.total} Product departments</h2>

		<Button variant="outline" on:click={dialog.open}>
			<Plus class="h-4 w-4 md:mr-2" />
			<span class="hidden md:inline">New department</span>
		</Button>
	</div>

	<Search on:input={handleSearchChanged} on:reset={reset} />

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
						<Row
							{department}
							on:deleted={() =>
								(departments = departments.filter(({ id }) => id !== department.id))}
						/>
					{/each}
				</TableBody>
			</Table>
		</div>
	</div>
</div>

<Dialog bind:this={dialog}>
	<DialogContent class="sm:max-w-[425px]">
		<DialogHeader>
			<DialogTitle>New department</DialogTitle>
		</DialogHeader>
		<div class="grid gap-4 py-4">
			<div class="grid grid-cols-4 items-center gap-4">
				<Input id="name" value="Pedro Duarte" class="col-span-3" />
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Input id="username" value="@peduarte" class="col-span-3" />
			</div>
		</div>
		<DialogFooter>
			<Button type="submit">Save changes</Button>
		</DialogFooter>
	</DialogContent>
</Dialog>
