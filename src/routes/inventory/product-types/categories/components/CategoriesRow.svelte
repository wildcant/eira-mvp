<script lang="ts">
	import Input from '$components/ui/input/Input.svelte';
	import Label from '$components/ui/label/Label.svelte';
	import TableCell from '$components/ui/table/TableCell.svelte';
	import TableRow from '$components/ui/table/TableRow.svelte';
	import type { DatabaseTypes } from '$lib/database/types';
	import { editing } from '../store';
	import CategoriesRowActions from './CategoriesRowActions.svelte';

	export let category: DatabaseTypes['Category'];
</script>

<TableRow>
	<TableCell>
		{#if $editing.state && $editing.category.id === category.id}
			<Label>
				<Input
					type="text"
					name="name"
					bind:value={$editing.category.name}
					disabled={$editing.loading}
				/>
			</Label>
		{:else}
			{category.name}
		{/if}
	</TableCell>

	<TableCell>
		{#if $editing.state && $editing.category.id === category.id}
			<Label>
				<Input
					type="departmentId"
					id="head"
					name="head"
					bind:value={$editing.category.departmentId}
					disabled={$editing.loading}
				/>
			</Label>
		{:else}
			<div class="w-4 h-4 rounded-sm">{category.departmentId}</div>
		{/if}
	</TableCell>

	<TableCell>
		<CategoriesRowActions {category} on:deleted />
	</TableCell>
</TableRow>
