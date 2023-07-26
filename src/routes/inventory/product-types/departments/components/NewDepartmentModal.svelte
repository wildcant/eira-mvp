<script lang="ts" context="module">
	export const NEW_DEPARTMENT_MODAL_ID = 'new-department';
</script>

<script lang="ts">
	import Button from '$components/ui/button/Button.svelte';
	import DialogFooter from '$components/ui/dialog/DialogFooter.svelte';
	import Form from '$components/ui/form/Form.svelte';
	import FormField from '$components/ui/form/FormField.svelte';
	import FormInput from '$components/ui/form/FormInput.svelte';
	import FormLabel from '$components/ui/form/FormLabel.svelte';
	import { openToast } from '$components/ui/toast/ToastManager.svelte';
	import { t } from '$lib/i18n';
	import { departmentSchema } from '$lib/schemas/department';
	import { onDestroy } from 'svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { newDepartmentFormState } from '../store';

	const form = superForm($newDepartmentFormState, { validators: departmentSchema });
	const { errors } = form;

	$: if ($errors._errors?.length) {
		openToast({
			data: { variant: 'destructive', title: 'Error', description: $errors._errors[0] }
		});
	}

	onDestroy(() => errors.clear());
</script>

<Form {form} method="post" action="?/create">
	<FormField name="name">
		<FormLabel>
			{$t('page.inventory.product-types.departments.modal.create.input.name.label')}
		</FormLabel>
		<FormInput type="text" />
	</FormField>
	<FormField name="color">
		<FormLabel>
			{$t('page.inventory.product-types.departments.modal.create.input.color.label')}
		</FormLabel>
		<FormInput type="color" />
	</FormField>

	<DialogFooter>
		<Button type="submit">
			{$t('page.inventory.product-types.departments.modal.create.button.submit')}
		</Button>
	</DialogFooter>
</Form>
