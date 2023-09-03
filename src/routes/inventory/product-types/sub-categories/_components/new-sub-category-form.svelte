<script lang="ts">
	import type { Category } from '$lib/api/types';
	import * as Form from '$lib/components/custom/form';
	import { t } from '$lib/i18n';

	export let categories: Category[];
</script>

<Form.Field name="name">
	<Form.Label>
		{$t('common.word.name.capitalize')}
	</Form.Label>
	<Form.Input type="text" />
</Form.Field>

<Form.Field name="categoryId">
	<Form.Label>
		{$t('entity.category.singular.capitalize')}
	</Form.Label>
	{@const options = categories?.map((d) => ({
		label: d.name,
		value: d.id
	}))}
	<Form.Autocomplete {options} />
</Form.Field>
