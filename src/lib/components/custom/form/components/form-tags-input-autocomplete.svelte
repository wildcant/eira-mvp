<script lang="ts" generics="T extends string | number = string, TMeta extends Meta = MetaDefault">
	import type { Meta, MetaDefault } from '$lib/components/custom/autocomplete';
	import type { Tag } from '@melt-ui/svelte';
	import isArray from 'lodash/isArray';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { formFieldProxy } from 'sveltekit-superforms/client';
	import TagsInputAutocomplete from '../../tags-input-autocomplete/tags-input-autocomplete.svelte';
	import type { TagsInputAutocompleteProps } from '../../tags-input-autocomplete/types';
	import { parseFormFieldError } from '../helpers';
	import { getFieldContext } from './form-field.svelte';
	import { getFormContext } from './form.svelte';

	type $$Props = Pick<TagsInputAutocompleteProps, 'allowedTags'>;

	export let allowedTags: TagsInputAutocompleteProps['allowedTags'];
	export let disabled = false;

	const { name } = getFieldContext?.() ?? {};

	if (!name)
		throw new Error('Missing name name. Make sure you wrap your form input with a form name');

	const { form } = getFormContext();
	const { value, errors } = formFieldProxy(form, name);
	const { submitting } = form;

	const tags = writable<Tag[]>([]);

	// Update tags with default value on mount
	onMount(() => {
		if ($value && isArray($value)) {
			const defaultTags = $value
				.map((v) => allowedTags.find((tag) => tag.id.toString() === v.id?.toString()))
				.filter(Boolean) as Tag[];
			if (defaultTags.length) $tags = defaultTags;
		}
	});

	$: error = parseFormFieldError($errors);
</script>

<TagsInputAutocomplete
	{allowedTags}
	{tags}
	invalid={Boolean(error)}
	disabled={disabled || $submitting || !allowedTags.length}
	on:change
/>
