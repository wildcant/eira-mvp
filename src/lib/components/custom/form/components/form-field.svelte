<script lang="ts" context="module">
	import { uniqueContext } from '$lib/helpers/uniqueContext';

	type FieldName = NonNullable<HTMLInputAttributes['name']>;
	const { getContext, setContext } = uniqueContext<{ name: FieldName }>();
	export const getFieldContext = getContext;
</script>

<script lang="ts">
	import type { Action } from 'svelte/action';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { derived } from 'svelte/store';
	import { formFieldProxy } from 'sveltekit-superforms/client';
	import FormError from './form-error.svelte';
	import { getFormContext } from './form.svelte';

	export let name: FieldName;
	let className: string | undefined | null = undefined;
	export { className as class };

	const { form } = getFormContext();
	const fields = Object.keys(form.fields);
	if (!fields.includes(name))
		throw new Error(
			`invalid form field name "${name}" use one of the following: ${fields.join(', ')}.`
		);

	setContext({ name });

	const { errors, value } = formFieldProxy(form, name);

	type Field = {
		events: Action<HTMLInputElement>;
		setValue: (val: any) => void;
	};

	let field: Field = {
		events: (node) => {
			// Handle form reset.
			value.subscribe((v) => {
				if (!v && node.value) node.value = '';
			});

			const handleChange = (event: Event) => {
				const target = event.target as HTMLInputElement;
				let newValue;
				if (node.type === 'file') {
					newValue = target.files?.[0];
				} else {
					newValue = target.value;
				}
				value.set(newValue);
			};
			node.addEventListener('input', handleChange, true);
			return {
				destroy() {
					node.removeEventListener('input', handleChange, true);
				}
			};
		},
		setValue: (val: any) => value.set(val)
	};

	const hasErrors = derived([errors], ([$errors]) =>
		Boolean($errors && (('_errors' in $errors && $errors._errors) || $errors.length))
	);
</script>

<div class={className}>
	<slot {field} hasErrors={$hasErrors} />

	{#if $errors}
		<FormError>
			{#if $errors?.length}
				{$errors}
			{:else if '_errors' in $errors && $errors._errors}
				{$errors._errors}
			{/if}
		</FormError>
	{/if}
</div>
