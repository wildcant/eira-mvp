<script lang="ts">
	import * as Form from '$lib/components/custom/form';
	import { t } from '$lib/i18n';
	import { taxScopeOptions, taxTypeOptions } from '../options';
</script>

<Form.Field name="name">
	<Form.Label>
		{$t('common.word.name.capitalize')}
	</Form.Label>
	<Form.Input type="text" />
</Form.Field>

<Form.Field name="amount">
	<Form.Label>
		{$t('common.word.value.capitalize')}
	</Form.Label>
	<Form.Input type="number" min={0} step="0.001" />
</Form.Field>

<Form.Field name="scope">
	<Form.Label>
		{$t('common.word.scope.capitalize')}
	</Form.Label>

	<Form.Autocomplete options={$taxScopeOptions} />
</Form.Field>

<Form.Field name="type">
	<Form.Label>
		{$t('common.word.type.capitalize')}
	</Form.Label>

	<Form.Autocomplete options={$taxTypeOptions} />
</Form.Field>
