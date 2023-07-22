<script lang="ts">
	import Button from '$components/ui/button/Button.svelte';
	import Input from '$components/ui/input/Input.svelte';
	import Separator from '$components/ui/separator/Separator.svelte';
	import TableCell from '$components/ui/table/TableCell.svelte';
	import TableRow from '$components/ui/table/TableRow.svelte';
	import type { DatabaseTypes } from '$lib/database/types';
	import TableActions from './TableActions.svelte';
	import { editing } from './store';

	export let department: DatabaseTypes['Department'];

	let updatedDepartment: DatabaseTypes['Department'] | undefined;

	$: editingRow = updatedDepartment?.id === department.id;
</script>

<TableRow>
	<TableCell>
		{#if editingRow && updatedDepartment}
			<Input type="text" name="name" bind:value={updatedDepartment.name} />
		{:else}
			{department.name}
		{/if}
	</TableCell>
	<TableCell>
		{#if editingRow && updatedDepartment}
			<div>
				<input type="color" id="head" name="head" bind:value={updatedDepartment.color} />
				<label for="head" />
			</div>
		{:else}
			<div class="w-4 h-4 rounded-sm" style="background-color: {department.color};" />
		{/if}
	</TableCell>
	<TableCell>
		<TableActions {department} on:edit={(event) => (updatedDepartment = event.detail)} on:deleted />
	</TableCell>
</TableRow>

{#if updatedDepartment}
	<div class="absolute mx-auto inset-x-0 bottom-10 w-fit">
		<div
			class="bg-dual px-5 py-2 rounded-full flex justify-center items-center shadow-fab shadow-dual"
		>
			<Button
				variant="link"
				class="text-background"
				on:click={() => {
					editing.set(false);
					updatedDepartment = undefined;
				}}>Cancel</Button
			>

			<Separator class="h-4	bg-zinc-800" orientation="vertical" />

			<Button
				variant="link"
				class="text-background"
				on:click={() => {
					fetch(`/api/products/departments.json/${department.id}`, {
						method: 'put',
						body: JSON.stringify({ name: updatedDepartment?.name, color: updatedDepartment?.color })
					})
						.catch((err) => {
							console.log(err);
						})
						.finally(() => {
							editing.set(false);
							updatedDepartment = undefined;
						});
				}}>Save</Button
			>
		</div>
	</div>
{/if}
