<script>
	import * as Form from '$lib/components/custom/form';
	import { t } from '$lib/i18n';
</script>

<Form.Field name="name">
	<Form.Label>
		{$t('common.word.name.capitalize')}
	</Form.Label>
	<Form.Input type="text" />
</Form.Field>

<Form.Field name="departmentId">
	<Form.Label>
		{$t('entity.department.singular.capitalize')}
	</Form.Label>
	<!-- <FormAutocomplete {options} /> -->
	<Form.Input type="text" />
</Form.Field>
