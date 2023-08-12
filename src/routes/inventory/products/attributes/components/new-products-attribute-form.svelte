<script lang="ts">
	import * as Form from '$lib/components/custom/form';
	import TagsInput from '$lib/components/custom/tags-input/tags-input.svelte';
	import { t } from '$lib/i18n';
	import { cn } from '$lib/utils';
	import type { Tag } from '@melt-ui/svelte';

	const extractValues = (e: CustomEvent<Tag[]>) => e.detail?.map((tag) => tag.value);
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

<Form.Field name="values" let:field let:hasErrors>
	<Form.Label>
		{$t('common.word.values.capitalize')}
	</Form.Label>

	<TagsInput
		class={cn({ 'border-red-500': hasErrors })}
		on:change={(e) => field.setValue(extractValues(e))}
	/>
</Form.Field>
