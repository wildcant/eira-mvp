<script lang="ts">
	import { Label } from '$lib/components/ui/label';
	import { cn } from '$lib/utils';
	import { derived } from 'svelte/store';
	import { formFieldProxy } from 'sveltekit-superforms/client';
	import { getFieldContext } from './form-field.svelte';
	import { getFormContext } from './form.svelte';

	let className: string | undefined | null = undefined;
	export { className as class };

	const { name } = getFieldContext?.() ?? {};
	if (!name)
		throw new Error('Missing field name. Make sure you wrap your form label with a form name');

	const { form } = getFormContext();

	const { errors } = formFieldProxy(form, name);

	// For arrays the errors are returned within the _errors array.
	const hasErrors = derived([errors], ([$errors]) =>
		Boolean($errors && (('_errors' in $errors && $errors._errors) || $errors.length))
	);
</script>

<Label for={name} class={cn($hasErrors ? 'text-destructive' : '', className)} {...$$restProps}>
	<slot />
</Label>
