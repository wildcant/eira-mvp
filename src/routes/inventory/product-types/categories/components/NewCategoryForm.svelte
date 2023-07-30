<script>
	import FormField from '$components/ui/form/FormField.svelte';
	import FormInput from '$components/ui/form/FormInput.svelte';
	import FormLabel from '$components/ui/form/FormLabel.svelte';
	import { t } from '$lib/i18n';
</script>

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
	<!-- <FormAutocomplete {options} /> -->
	<FormInput type="text" />
</FormField>
