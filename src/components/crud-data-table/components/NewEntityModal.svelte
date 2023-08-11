<script lang="ts" context="module">
	export const NEW_ENTITY_MODAL_ID = 'new-entity';
</script>

<script lang="ts">
	import * as Form from '$lib/components/custom/form';
	import { openToast } from '$lib/components/custom/toast';
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { t } from '$lib/i18n';
	import { createEventDispatcher } from 'svelte';
	import { writable } from 'svelte/store';
	import { superForm } from 'sveltekit-superforms/client';
	import type { AnyZodObject } from 'zod';
	import type { NewEntityForm } from '../types';

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

<Form.Root form={newEntityForm} method="post" action="?/create">
	<slot />

	<Dialog.Footer>
		<Button type="submit">
			{$t('common.word.save.capitalize')}
		</Button>
	</Dialog.Footer>
</Form.Root>
