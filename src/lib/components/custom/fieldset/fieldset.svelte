<script lang="ts">
	import type { HTMLFieldsetAttributes } from 'svelte/elements';
	import FormError from '../form/components/form-error.svelte';

	type $$Props = HTMLFieldsetAttributes & {
		errors?: string | string[] | undefined;
	};

	export let errors: $$Props['errors'] = undefined;
	$: invalid = Boolean(errors);
</script>

<fieldset {...$$restProps}>
	<slot {invalid} />
	{#if errors}
		<FormError>
			{#if typeof errors === 'string'}
				{errors}
			{:else}
				{errors.join(', ')}
			{/if}
		</FormError>
	{/if}
</fieldset>
