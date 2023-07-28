<script lang="ts">
	import Autocomplete, { type Option } from '$components/ui/autocomplete/Autocomplete.svelte';
	import AutocompleteButton from '$components/ui/autocomplete/AutocompleteButton.svelte';
	import AutocompleteInput from '$components/ui/autocomplete/AutocompleteInput.svelte';
	import AutocompleteOption from '$components/ui/autocomplete/AutocompleteOption.svelte';
	import AutocompleteOptions from '$components/ui/autocomplete/AutocompleteOptions.svelte';
	import Input from '$components/ui/input/Input.svelte';
	import Label from '$components/ui/label/Label.svelte';
	import TableCell from '$components/ui/table/TableCell.svelte';
	import TableRow from '$components/ui/table/TableRow.svelte';
	import type { Category, Department } from '$lib/api/types';
	import { editing } from '../store';
	import CategoriesRowActions from './CategoriesRowActions.svelte';

	export let category: Category;
	export let departments: Department[];

	$: options = departments?.map((d) => ({
		label: d.name,
		value: d.id
	})) satisfies Option<number>[];
</script>

<TableRow>
	<TableCell class="w-8/12">
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

	<TableCell class="w-3/12">
		{#if $editing.state && $editing.category.id === category.id}
			{@const selectedItem = options.find((option) => option.value === category.departmentId)}
			<Autocomplete {options} {selectedItem}>
				<Label class="cursor-pointer">
					<AutocompleteInput name="departmentId" disabled={$editing.loading} />
					<AutocompleteButton />
				</Label>

				<AutocompleteOptions let:filteredOptions>
					{#each filteredOptions as option, index (index)}
						<AutocompleteOption {index} {option}>{option.label}</AutocompleteOption>
					{/each}
				</AutocompleteOptions>
			</Autocomplete>
		{:else}
			{category.department?.name}
		{/if}
	</TableCell>

	<TableCell class="w-1/12">
		<CategoriesRowActions {category} on:deleted />
	</TableCell>
</TableRow>
