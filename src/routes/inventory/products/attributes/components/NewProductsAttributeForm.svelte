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

<Form.Field name="unitOfMeasure">
	<Form.Label>
		{$t('common.phrase.unit-of-measure')}
	</Form.Label>
	<Form.Input type="text" />
</Form.Field>
