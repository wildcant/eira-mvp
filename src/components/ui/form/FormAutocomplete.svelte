<script lang="ts" generics="T extends string | number = string, TMeta extends Meta = MetaDefault">
	import { cn } from '$lib/utils';

	import type { Meta, MetaDefault, Option } from '$components/ui/autocomplete/Autocomplete.svelte';
	import Autocomplete from '$components/ui/autocomplete/Autocomplete.svelte';
	import AutocompleteButton from '$components/ui/autocomplete/AutocompleteButton.svelte';
	import AutocompleteInput from '$components/ui/autocomplete/AutocompleteInput.svelte';
	import AutocompleteOption from '$components/ui/autocomplete/AutocompleteOption.svelte';
	import AutocompleteOptions from '$components/ui/autocomplete/AutocompleteOptions.svelte';
	import { formFieldProxy } from 'sveltekit-superforms/client';
	import { getFormContext } from './Form.svelte';
	import { getFieldContext } from './FormField.svelte';

	type AutocompleteOption = Option<T, TMeta>;
	export let options: AutocompleteOption[];

	const { name } = getFieldContext?.() ?? {};
	if (!name)
		throw new Error('Missing name name. Make sure you wrap your form input with a form name');

	const { form } = getFormContext();
	const { value, errors } = formFieldProxy(form, name);
	const { submitting } = form;
</script>

<!-- TODO: Fix is coming on melt stable release.  (Fix issue clicking on option doesn't select and closes dialog.) -->
<Autocomplete {options} bind:value={$value}>
	<div class="cursor-pointer">
		<AutocompleteInput {name} class={cn({ 'border-red-500': !!$errors })} disabled={$submitting} />
		<AutocompleteButton />
	</div>

	<AutocompleteOptions let:filteredOptions>
		{#each filteredOptions as option, index (index)}
			<AutocompleteOption {index} {option}>{option.label}</AutocompleteOption>
		{/each}
	</AutocompleteOptions>
</Autocomplete>
