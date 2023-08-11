<script lang="ts">
	import { Uploader } from '$components/uploader';
	import * as Form from '$lib/components/custom/form';
	import { Button } from '$lib/components/ui/button';
	import { Input as ComplexCustomInput, inputVariants } from '$lib/components/ui/input';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { schema } from './schema';

	export let data;

	const form = superForm(data.form, { validators: schema });

	const { form: superFrm, errors } = form;
</script>

<Form.Root {form} method="post">
	<!-- Implicit binding using context and component wrappers. -->

	<Form.Field name="name">
		<Form.Label>Name</Form.Label>
		<Form.Input type="text" />
	</Form.Field>

	<Form.Field name="email">
		<Form.Label>Email</Form.Label>
		<Form.Input type="email" />
		<Form.Description>Please add your email.</Form.Description>
	</Form.Field>

	<!-- Explicit binding use actions and custom events. -->

	<Form.Field name="simple" let:field>
		<Form.Label>Simple</Form.Label>
		<input class={inputVariants()} type="string" use:field.events />
	</Form.Field>

	<Form.Field name="complex" let:field>
		<Form.Label>Complex</Form.Label>
		<ComplexCustomInput type="string" use={field.events} />
	</Form.Field>

	<Form.Field name="image" let:field>
		<Uploader on:change={(e) => field.setValue(e.detail.imageId)} />
	</Form.Field>

	<div class="flex flex-row gap-4 my-4">
		<Button on:click={() => form.reset()} type="button" variant="outline">reset</Button>

		<Button type="submit">Submit</Button>
	</div>
</Form.Root>

<SuperDebug data={{ $superFrm, $errors }} />
