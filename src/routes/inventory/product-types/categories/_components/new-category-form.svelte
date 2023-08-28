<script lang="ts">
	import type { Department } from '$lib/api/types';
	import * as Form from '$lib/components/custom/form';
	import { t } from '$lib/i18n';

	export let departments: Department[];
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
	{@const options = departments?.map((d) => ({
		label: d.name,
		value: d.id
	}))}
	<Form.Autocomplete {options} />
</Form.Field>
