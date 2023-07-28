<script lang="ts">
	import Input from '$components/ui/input/Input.svelte';
	import Label from '$components/ui/label/Label.svelte';
	import TableCell from '$components/ui/table/TableCell.svelte';
	import TableRow from '$components/ui/table/TableRow.svelte';
	import type { Department } from '$lib/api/types';
	import { editing } from '../store';
	import DepartmentsRowActions from './DepartmentsRowActions.svelte';

	export let department: Department;
</script>

<TableRow>
	<TableCell class="w-8/12">
		{#if $editing.state && $editing.department.id === department.id}
			<Label>
				<Input
					type="text"
					name="name"
					bind:value={$editing.department.name}
					disabled={$editing.loading}
				/>
			</Label>
		{:else}
			{department.name}
		{/if}
	</TableCell>

	<TableCell class="w-3/12">
		{#if $editing.state && $editing.department.id === department.id}
			<Label>
				<Input
					type="color"
					id="head"
					name="head"
					bind:value={$editing.department.color}
					disabled={$editing.loading}
				/>
			</Label>
		{:else}
			<div class="w-4 h-4 rounded-sm" style="background-color: {department.color};" />
		{/if}
	</TableCell>

	<TableCell class="w-1/12">
		<DepartmentsRowActions {department} on:deleted />
	</TableCell>
</TableRow>
