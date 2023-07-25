<script lang="ts">
	import Button from '$components/ui/button/Button.svelte';
	import Form from '$components/ui/form/Form.svelte';
	import FormField from '$components/ui/form/FormField.svelte';
	import FormInput from '$components/ui/form/FormInput.svelte';
	import FormLabel from '$components/ui/form/FormLabel.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { schema } from './schema';
	import FormDescription from '$components/ui/form/FormDescription.svelte';

	export let data;

	const form = superForm(data.form, { validators: schema });
	const { form: superFrm, errors } = form;
</script>

<SuperDebug data={{ $superFrm, $errors }} />

<Form {form} method="post">
	<FormField name="name">
		<FormLabel>Name</FormLabel>
		<FormInput type="text" />
	</FormField>

	<FormField name="email">
		<FormLabel>Email</FormLabel>
		<FormInput type="email" />
		<FormDescription>Please add your email.</FormDescription>
	</FormField>

	<Button type="submit">Submit</Button>
</Form>
