<script lang="ts">
	import type { Category, Department, SubCategory } from '$lib/api/types';
	import * as Form from '$lib/components/custom/form';
	import { getFormContext } from '$lib/components/custom/form/components/form.svelte';
	import { t } from '$lib/i18n';
	import type { ProductCategorizationZodSchema } from '$lib/schemas';
	import { derived } from 'svelte/store';
	// import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	export let departments: Department[];
	export let categories: Category[];
	export let subCategories: SubCategory[];
	const { form } = getFormContext<ProductCategorizationZodSchema>();
	const { fields, form: values } = form;
	const {
		departmentId: { value: departmentId },
		categoryId: { value: categoryId },
		subCategoryId: { value: subCategoryId }
	} = fields;

	const allowedDepartments = departments?.map((dep) => ({
		value: dep.id,
		label: dep.name
	}));

	const allowedCategories = derived(departmentId, (dId) =>
		categories
			?.filter((category) => category.departmentId === dId)
			.map(({ id, name }) => ({
				value: id,
				label: name
			}))
	);

	const allowedSubCategories = derived(categoryId, (cId) =>
		subCategories
			?.filter((subCategory) => subCategory.categoryId === cId)
			.map(({ id, name }) => ({
				value: id,
				label: name
			}))
	);
</script>

<!-- <SuperDebug data={{ $values }} /> -->

<Form.Field name="departmentId">
	<Form.Label>
		{$t('entity.department.singular.capitalize')}
	</Form.Label>

	<Form.Autocomplete
		options={allowedDepartments}
		on:change={() => {
			categoryId.set(undefined);
			subCategoryId.set(undefined);
		}}
	/>
</Form.Field>

<Form.Field name="categoryId">
	<Form.Label>
		{$t('entity.category.singular.capitalize')}
	</Form.Label>

	<Form.Autocomplete
		options={$allowedCategories}
		disabled={$allowedCategories.length === 0}
		on:change={() => subCategoryId.set(undefined)}
	/>
</Form.Field>

<Form.Field name="subCategoryId">
	<Form.Label>
		{$t('entity.sub-category.singular.capitalize')}
	</Form.Label>

	<Form.Autocomplete
		options={$allowedSubCategories}
		disabled={$allowedSubCategories.length === 0}
	/>
</Form.Field>
