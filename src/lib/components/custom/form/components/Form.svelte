<script lang="ts" context="module">
	import { uniqueContext } from '$lib/helpers/uniqueContext';

	const { setContext, getContext } = uniqueContext<{
		form: SuperForm<ZodValidation<any>, unknown>;
	}>();
	export const getFormContext = <T = SuperForm<ZodValidation<any>, unknown>>() =>
		getContext() as { form: T };
</script>

<script lang="ts" generics="T extends AnyZodObject">
	import type { HTMLFormAttributes } from 'svelte/elements';

	import type { ZodValidation } from 'sveltekit-superforms';
	import type { SuperForm } from 'sveltekit-superforms/client';
	import type { AnyZodObject } from 'zod';

	interface $$Props extends HTMLFormAttributes {
		form: SuperForm<ZodValidation<T>, unknown>;
	}

	let className: $$Props['class'] = undefined;
	export { className as class };

	export let form: SuperForm<ZodValidation<T>, unknown>;

	setContext({ form: form as any });
</script>

<form use:form.enhance class={className} {...$$restProps}>
	<slot />
</form>
