<script lang="ts" generics="T extends string | number = string, TMeta extends Meta = MetaDefault">
	import type { Item, Meta, MetaDefault } from '$lib/components/custom/autocomplete';
	import * as Autocomplete from '$lib/components/custom/autocomplete';
	import { cn } from '$lib/utils';
	import { formFieldProxy } from 'sveltekit-superforms/client';
	import { getFormContext } from './Form.svelte';
	import { getFieldContext } from './FormField.svelte';

	type AutocompleteOption = Item<T, TMeta>;
	export let options: AutocompleteOption[];

	const { name } = getFieldContext?.() ?? {};
	if (!name)
		throw new Error('Missing name name. Make sure you wrap your form input with a form name');

	const { form } = getFormContext();
	const { value, errors } = formFieldProxy(form, name);
	const { submitting } = form;
</script>

<!-- TODO: Fix is coming on melt stable release.  (Fix issue clicking on option doesn't select and closes dialog.) -->
<Autocomplete.Root items={options} bind:value={$value}>
	<div class="cursor-pointer">
		<Autocomplete.Input {name} class={cn({ 'border-red-500': !!$errors })} disabled={$submitting} />
		<Autocomplete.Button />
	</div>

	<Autocomplete.Options let:filteredOptions>
		{#each filteredOptions as option, index (index)}
			<Autocomplete.Option {index} item={option}>{option.label}</Autocomplete.Option>
		{/each}
	</Autocomplete.Options>
</Autocomplete.Root>
