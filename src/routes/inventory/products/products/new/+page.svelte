<script lang="ts">
	import { Container } from '$lib/components/custom/container';
	import * as Form from '$lib/components/custom/form';
	import Modal from '$lib/components/custom/modal/components/modal.svelte';
	import { Button } from '$lib/components/ui/button';
	import { t } from '$lib/i18n';
	import { productsSchema } from '$lib/schemas/product';
	import { effect } from '@melt-ui/svelte/internal/helpers';
	import { Plus } from 'lucide-svelte';
	import { createRender } from 'svelte-headless-table';
	import { derived } from 'svelte/store';
	import { superForm } from 'sveltekit-superforms/client';
	import AttributesTable from './components/attributes-table.svelte';
	import NewVariantModal, { NEW_VARIANT_MODAL_ID } from './components/new-variant-modal.svelte';
	import VariantsTable from './components/variants-table.svelte';
	import Uploader from '$components/uploader/uploader.svelte';
	// import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	export let data;
	const { attributes, categories, departments, subCategories } = data;

	const form = superForm(data.form, { validators: $productsSchema });
	const { tainted, fields, validate /*, form: frm, errors*/ } = form;
	const {
		departmentId: { value: departmentId },
		categoryId: { value: categoryId },
		subCategoryId: { value: subCategoryId },
		attributes: { value: attributesField, errors: attributesErrors }
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

	// Reset category field when department changes.
	effect([departmentId], () => categoryId.set(undefined));
	// Reset subcategory field when category changes.
	effect([categoryId], () => subCategoryId.set(undefined));

	let modalOpen = false;
	const openNewVariantModal = () => (modalOpen = true);
</script>

<!-- <SuperDebug data={{ $frm, $errors }} /> -->

<Form.Root {form} method="post" class="form" id="new-product-form">
	<div class="flex justify-between items-center mb-4">
		<h2 class="p-0">
			{$t('common.word.new.capitalize')}
			{$t('entity.product.singular.lowercase')}
		</h2>
		<Button disabled={!$tainted} type="submit">Guardar</Button>
	</div>

	<div class="form-grid">
		<div class="grid-area-[basic-info]">
			<Container class="grid gap-4 rounded-md">
				<div>
					<h3>{$t('page.inventory.products.new.basic-information.title')}</h3>
					<p>{$t('page.inventory.products.new.basic-information.subtitle')}</p>
				</div>

				<Form.Field name="name">
					<Form.Label>
						{$t('page.inventory.products.new.basic-information.field.name.label')}
					</Form.Label>
					<Form.Input
						type="text"
						placeholder={$t('page.inventory.products.new.basic-information.field.name.placeholder')}
					/>
				</Form.Field>

				<Form.Field name="description">
					<Form.Label>
						{$t('page.inventory.products.new.basic-information.field.description.label')}
					</Form.Label>
					<Form.Textarea
						placeholder={$t(
							'page.inventory.products.new.basic-information.field.description.placeholder'
						)}
					/>
				</Form.Field>
			</Container>
		</div>

		<div class="grid-area-[categorization]">
			<Container class="grid gap-4 rounded-md">
				<div>
					<h3>{$t('page.inventory.products.new.categorization.title')}</h3>
					<p>{$t('page.inventory.products.new.categorization.subtitle')}</p>
				</div>

				<Form.Field name="departmentId">
					<Form.Label>
						{$t('entity.department.singular.capitalize')}
					</Form.Label>

					<Form.Autocomplete options={allowedDepartments} />
				</Form.Field>

				<Form.Field name="categoryId">
					<Form.Label>
						{$t('entity.category.singular.capitalize')}
					</Form.Label>

					<Form.Autocomplete
						options={$allowedCategories}
						disabled={$allowedCategories.length === 0}
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
			</Container>
		</div>

		<div class="grid-area-[image]">
			<Container class="grid gap-4 rounded-md">
				<div>
					<h3>{$t('page.inventory.products.new.image.title')}</h3>
					<p>{$t('page.inventory.products.new.image.subtitle')}</p>
				</div>

				<Form.Field name="imageId" let:field>
					<Uploader on:change={(e) => field.setValue(e.detail.imageId)} />
				</Form.Field>
			</Container>
		</div>

		<div class="grid-area-[attributes]">
			<Container class="grid gap-4 rounded-md">
				<div>
					<h3>{$t('page.inventory.products.new.attributes.title')}</h3>
					<p>{$t('page.inventory.products.new.attributes.subtitle')}</p>
				</div>

				<AttributesTable {attributes} {attributesField} attributesErrors={$attributesErrors} />
			</Container>
		</div>

		<div class="grid-area-[variants]">
			<Container class="grid gap-4 rounded-md">
				<div>
					<div class="flex justify-between">
						<h3>{$t('page.inventory.products.new.variants.title')}</h3>

						<Button variant="outline" on:click={openNewVariantModal}>
							<Plus class="mr-2 h-4 w-4" />
							{$t('common.word.add.capitalize')}
							{$t('entity.variant.singular.lowercase')}
						</Button>
					</div>
					<p>{$t('page.inventory.products.new.variants.subtitle')}</p>
				</div>

				<VariantsTable />
			</Container>
		</div>
	</div>

	{#if modalOpen}
		<Modal
			modal={{
				type: 'custom',
				closeOnEscape: false,
				closeOnOutsideClick: false,
				id: NEW_VARIANT_MODAL_ID,
				title: `${$t('common.word.new.capitalize')} ${$t(`entity.variant.singular.capitalize`)}`,
				children: createRender(NewVariantModal)
					.on('cancel', () => {
						// TODO: Undo changes in form for new variant.
						modalOpen = false;
					})
					.on('continue', async () => {
						const errors = await validate('name');
						// Close modal if there are no validation errors in the new variant form.
						if (!errors?.length) modalOpen = false;
					}),
				content: { class: 'md:min-w-full lg:min-w-[1024px]' }
			}}
			on:close={() => (modalOpen = false)}
		/>
	{/if}
</Form.Root>

<style>
	.form-grid {
		display: grid;
		gap: 1rem;
		grid-template-areas:
			'image'
			'basic-info'
			'categorization'
			'attributes'
			'variants';
	}

	@media (min-width: 1024px) {
		.form-grid {
			grid-template-columns: 3fr 2fr;
			grid-template-areas:
				'basic-info categorization'
				'attributes image'
				'variants variants';
		}
	}
</style>
