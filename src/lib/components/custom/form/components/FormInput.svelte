<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { cn } from '$lib/utils';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { formFieldProxy } from 'sveltekit-superforms/client';
	import { getFormContext } from './Form.svelte';
	import { getFieldContext } from './FormField.svelte';

	interface $$Props extends HTMLInputAttributes {
		disabled?: HTMLInputAttributes['disabled'];
		class?: string | undefined | null;
	}

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
	class={cn({ 'border-red-500': !!$errors }, className)}
	{...$$restProps}
/>
