<script lang="ts">
	import { Textarea } from '$lib/components/ui/textarea';
	import { cn } from '$lib/utils';
	import type { HTMLTextareaAttributes } from 'svelte/elements';
	import { formFieldProxy } from 'sveltekit-superforms/client';
	import { getFormContext } from './form.svelte';
	import { getFieldContext } from './form-field.svelte';

	interface $$Props extends HTMLTextareaAttributes {
		disabled?: HTMLTextareaAttributes['disabled'];
		class?: string | undefined | null;
	}

	export let disabled: HTMLTextareaAttributes['disabled'] = undefined;
	let className: string | undefined | null = undefined;
	export { className as class };

	const { name } = getFieldContext?.() ?? {};
	if (!name)
		throw new Error('Missing name name. Make sure you wrap your form input with a form name');

	const { form } = getFormContext();
	const { value, errors } = formFieldProxy(form, name);
	const { submitting } = form;
</script>

<Textarea
	id={name}
	{name}
	bind:value={$value}
	disabled={disabled || $submitting}
	class={cn({ 'border-red-500': !!$errors }, className)}
	{...$$restProps}
/>
