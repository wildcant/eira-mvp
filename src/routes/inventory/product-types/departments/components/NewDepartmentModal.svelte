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
	import { t } from '$lib/i18n';
	import { departmentSchema } from '$lib/schemas/department';
	import { onDestroy } from 'svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { formState } from '../store';

	const form = superForm($formState, { validators: departmentSchema });
	const { errors } = form;
	onDestroy(() => errors.clear());
</script>

<Form {form} method="post" action="?/update">
	<FormField name="name">
		<FormLabel>
			{$t('page.inventory.product-types.departments.modal.create.input.name.label')}
		</FormLabel>
		<FormInput type="text" />
	</FormField>
	<FormField name="name">
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
