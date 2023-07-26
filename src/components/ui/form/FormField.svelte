<script lang="ts" context="module">
	import { uniqueContext } from '$lib/helpers/uniqueContext';

	type FieldName = NonNullable<HTMLInputAttributes['name']>;
	const { getContext, setContext } = uniqueContext<{ name: FieldName }>();
	export const getFieldContext = getContext;
</script>

<script lang="ts">
	import { getFormContext } from '$components/ui/form/Form.svelte';
	import { cn } from '$lib/utils';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { formFieldProxy } from 'sveltekit-superforms/client';

	export let name: FieldName;

	const { form } = getFormContext();
	const fields = Object.keys(form.fields);
	if (!fields.includes(name))
		throw new Error(
			`invalid form field name "${name}" use one of the following: ${fields.join(', ')}.`
		);

	setContext({ name });

	const { errors } = formFieldProxy(form, name);
</script>

<slot />

<!-- Could move this to a different component is needed. -->
{#if $errors}
	<span class={cn('block text-sm font-medium text-destructive')}>
		{$errors}
	</span>
{/if}
