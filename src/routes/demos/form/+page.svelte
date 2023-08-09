<script lang="ts">
	import Button from '$components/ui/button/Button.svelte';
	import Form from '$components/ui/form/Form.svelte';
	import FormDescription from '$components/ui/form/FormDescription.svelte';
	import FormField from '$components/ui/form/FormField.svelte';
	import FormInput from '$components/ui/form/FormInput.svelte';
	import FormLabel from '$components/ui/form/FormLabel.svelte';
	import ComplexCustomInput, { inputVariants } from '$components/ui/input/Input.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { schema } from './schema';
	import Uploader from '$components/shared/uploader/Uploader.svelte';

	export let data;

	const form = superForm(data.form, { validators: schema });

	const { form: superFrm, errors } = form;
</script>

<Form {form} method="post">
	<!-- Implicit binding using context and component wrappers. -->

	<FormField name="name">
		<FormLabel>Name</FormLabel>
		<FormInput type="text" />
	</FormField>

	<FormField name="email">
		<FormLabel>Email</FormLabel>
		<FormInput type="email" />
		<FormDescription>Please add your email.</FormDescription>
	</FormField>

	<!-- Explicit binding use actions and custom events. -->

	<FormField name="simple" let:field>
		<FormLabel>Simple</FormLabel>
		<input class={inputVariants()} type="string" use:field.events />
	</FormField>

	<FormField name="complex" let:field>
		<FormLabel>Complex</FormLabel>
		<ComplexCustomInput type="string" use={field.events} />
	</FormField>

	<FormField name="image" let:field>
		<Uploader on:change={(e) => field.setValue(e.detail.imageId)} />
	</FormField>

	<div class="flex flex-row gap-4 my-4">
		<Button on:click={() => form.reset()} type="button" variant="outline">reset</Button>

		<Button type="submit">Submit</Button>
	</div>
</Form>

<SuperDebug data={{ $superFrm, $errors }} />
