<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { formFieldProxy } from 'sveltekit-superforms/client';
	import { getFieldContext } from './form-field.svelte';
	import { getFormContext } from './form.svelte';

	type $$Props = HTMLInputAttributes & {
		disabled?: HTMLInputAttributes['disabled'];
		class?: string | undefined | null;
	};

	export let disabled: HTMLInputAttributes['disabled'] = undefined;
	let className: string | undefined | null = undefined;
	export { className as class };

	const { name } = getFieldContext?.() ?? {};
	if (!name)
		throw new Error('Missing name name. Make sure you wrap your form input with a form name');

	const { form } = getFormContext();
	const { value, errors } = formFieldProxy(form, name);
	const { submitting } = form;
</script>

<Input
	id={name}
	{name}
	type="text"
	bind:value={$value}
	disabled={disabled || $submitting}
	invalid={!!$errors}
	class={className}
	{...$$restProps}
/>
