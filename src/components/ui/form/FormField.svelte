<script lang="ts" context="module">
	import { uniqueContext } from '$lib/helpers/uniqueContext';

	type FieldName = NonNullable<HTMLInputAttributes['name']>;
	const { getContext, setContext } = uniqueContext<{ name: FieldName }>();
	export const getFieldContext = getContext;
</script>

<script lang="ts">
	import { getFormContext } from '$components/ui/form/Form.svelte';
	import { cn } from '$lib/utils';
	import type { Action } from 'svelte/action';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { formFieldProxy } from 'sveltekit-superforms/client';

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

	export let field: Action<HTMLInputElement> = (node) => {
		// Handle form reset.
		value.subscribe((v) => {
			if (!v && node.value) node.value = '';
		});

		const handleChange = (event: Event) => value.set((event.target as HTMLInputElement).value);
		node.addEventListener('input', handleChange, true);
		return {
			destroy() {
				node.removeEventListener('input', handleChange, true);
			}
		};
	};
</script>

<div class={className}>
	<slot {field} />

	<!-- Could move this to a different component if needed. -->
	{#if $errors}
		<span class={cn('block text-sm font-medium text-destructive')}>
			{$errors}
		</span>
	{/if}
</div>
