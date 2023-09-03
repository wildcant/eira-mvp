<script lang="ts">
	import { Label } from '$lib/components/ui/label';
	import { formFieldProxy } from 'sveltekit-superforms/client';
	import { parseFormFieldError } from '../helpers';
	import { getFieldContext } from './form-field.svelte';
	import { getFormContext } from './form.svelte';

	let className: string | undefined | null = undefined;
	export { className as class };

	const { name } = getFieldContext?.() ?? {};
	if (!name)
		throw new Error('Missing field name. Make sure you wrap your form label with a form name');

	const { form } = getFormContext();

	const { errors } = formFieldProxy(form, name);

	$: error = parseFormFieldError($errors);
</script>

<Label for={name} invalid={Boolean(error)} class={className} {...$$restProps}>
	<slot />
</Label>
