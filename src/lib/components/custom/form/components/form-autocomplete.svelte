<script lang="ts" generics="T extends string | number = string, TMeta extends Meta = MetaDefault">
	import type { Item, Meta, MetaDefault } from '$lib/components/custom/autocomplete';
	import * as Autocomplete from '$lib/components/custom/autocomplete';
	import { cn } from '$lib/utils';
	import { formFieldProxy } from 'sveltekit-superforms/client';
	import { getFieldContext } from './form-field.svelte';
	import { getFormContext } from './form.svelte';

	type AutocompleteOption = Item<T, TMeta>;
	export let options: AutocompleteOption[];
	export let disabled: boolean = false;
	let selectedOption: AutocompleteOption | undefined;
	const { name } = getFieldContext?.() ?? {};

	if (!name)
		throw new Error('Missing name name. Make sure you wrap your form input with a form name');

	const { form } = getFormContext();
	const { value, errors } = formFieldProxy(form, name);
	const { submitting } = form;

	$: if (!$value) selectedOption = undefined;
</script>

<Autocomplete.Root bind:value={selectedOption} on:change={(e) => ($value = e.detail.value)}>
	<div class={cn('cursor-pointer', { 'cursor-not-allowed': disabled })}>
		<Autocomplete.Input
			{name}
			class={cn('peer', { 'border-red-500': !!$errors })}
			disabled={$submitting || disabled}
		/>
		<Autocomplete.Button />
	</div>

	<Autocomplete.Options>
		{#each options as option, index (index)}
			<Autocomplete.Option item={option}>{option.label}</Autocomplete.Option>
		{/each}
	</Autocomplete.Options>
</Autocomplete.Root>
