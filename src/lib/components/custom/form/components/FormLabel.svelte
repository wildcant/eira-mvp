<script lang="ts">
	import { Label } from '$lib/components/ui/label';
	import { cn } from '$lib/utils';
	import { formFieldProxy } from 'sveltekit-superforms/client';
	import { getFormContext } from './Form.svelte';
	import { getFieldContext } from './FormField.svelte';

	let className: string | undefined | null = undefined;
	export { className as class };

	const { name } = getFieldContext?.() ?? {};
	if (!name)
		throw new Error('Missing field name. Make sure you wrap your form label with a form name');

	const { form } = getFormContext();

	const { errors } = formFieldProxy(form, name);
</script>

<Label for={name} class={cn($errors ? 'text-destructive' : '', className)} {...$$restProps}>
	<slot />
</Label>
