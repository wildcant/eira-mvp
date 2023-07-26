<script lang="ts" context="module">
	export const NEW_CATEGORY_MODAL_ID = 'new-category';
</script>

<script lang="ts">
	import type { Option } from '$components/ui/autocomplete/Autocomplete.svelte';
	import Button from '$components/ui/button/Button.svelte';
	import DialogFooter from '$components/ui/dialog/DialogFooter.svelte';
	import Form from '$components/ui/form/Form.svelte';
	import FormAutocomplete from '$components/ui/form/FormAutocomplete.svelte';
	import FormField from '$components/ui/form/FormField.svelte';
	import FormInput from '$components/ui/form/FormInput.svelte';
	import FormLabel from '$components/ui/form/FormLabel.svelte';
	import { openToast } from '$components/ui/toast/ToastManager.svelte';
	import { t } from '$lib/i18n';
	import { categorySchema } from '$lib/schemas/category';
	import { onDestroy } from 'svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { newCategoryFormState } from '../store';

	const form = superForm($newCategoryFormState.form, { validators: categorySchema });
	const { errors, form: frm } = form;

	$: if ($errors._errors?.length) {
		openToast({
			data: { variant: 'destructive', title: 'Error', description: $errors._errors[0] }
		});
	}

	onDestroy(() => errors.clear());

	$: options = $newCategoryFormState.departments?.map((d) => ({
		label: d.name,
		value: d.id
	})) satisfies Option<number>[];
</script>

<!-- <SuperDebug data={{ $frm, $errors }} /> -->

<Form {form} method="post" action="?/create">
	<FormField name="name">
		<FormLabel>
			{$t('common.word.name.capitalize')}
		</FormLabel>
		<FormInput type="text" />
	</FormField>
	<FormField name="departmentId">
		<FormLabel>
			{$t('entity.department.singular.capitalize')}
		</FormLabel>
		<FormAutocomplete {options} />
	</FormField>

	<DialogFooter>
		<Button type="submit">
			{$t('common.word.save.capitalize')}
		</Button>
	</DialogFooter>
</Form>
