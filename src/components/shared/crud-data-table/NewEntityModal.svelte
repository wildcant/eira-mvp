<script lang="ts" context="module">
	export const NEW_ENTITY_MODAL_ID = 'new-entity';
</script>

<script lang="ts">
	import Button from '$components/ui/button/Button.svelte';
	import DialogFooter from '$components/ui/dialog/DialogFooter.svelte';
	import Form from '$components/ui/form/Form.svelte';
	import { openToast } from '$components/ui/toast/ToastManager.svelte';
	import { t } from '$lib/i18n';
	import { createEventDispatcher } from 'svelte';
	import { writable } from 'svelte/store';
	import { superForm } from 'sveltekit-superforms/client';
	import type { AnyZodObject } from 'zod';
	import type { NewEntityForm } from './types';

	export let form: NewEntityForm;
	export let validators: AnyZodObject;

	const sprForm = writable(form);
	const dispatch = createEventDispatcher();

	const newEntityForm = superForm($sprForm, {
		validators,
		onResult: ({ result }) => {
			if (result.type === 'success') {
				dispatch('success');
			}
		},
		resetForm: true
	});
	const { errors } = newEntityForm;

	$: if ($errors._errors?.length) {
		openToast({
			data: { variant: 'destructive', title: 'Error', description: $errors._errors[0] }
		});
	}
</script>

<Form form={newEntityForm} method="post" action="?/create">
	<slot />

	<DialogFooter>
		<Button type="submit">
			{$t('common.word.save.capitalize')}
		</Button>
	</DialogFooter>
</Form>
