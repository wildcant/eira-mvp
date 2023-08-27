<script lang="ts" generics="T extends string | number = string, TMeta extends Meta = MetaDefault">
	import type { Item, Meta, MetaDefault } from '$lib/components/custom/autocomplete';
	import type { Tag } from '@melt-ui/svelte';
	import { writable } from 'svelte/store';
	import { formFieldProxy } from 'sveltekit-superforms/client';
	import TagsInputAutocomplete from '../../tags-input-autocomplete/tags-input-autocomplete.svelte';
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

	const tags = writable<Tag[]>([]);
	const allowedTags =
		options.map((v) => ({
			id: v.value.toString(),
			value: v.label
		})) ?? [];
</script>

<TagsInputAutocomplete {allowedTags} {tags} disabled={$submitting || !allowedTags.length} />
