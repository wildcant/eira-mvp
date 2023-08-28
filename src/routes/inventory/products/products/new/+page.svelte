<script lang="ts">
	import Uploader from '$components/uploader/uploader.svelte';
	import { Container } from '$lib/components/custom/container';
	import * as Form from '$lib/components/custom/form';
	import { closeModal, openCustomModal } from '$lib/components/custom/modal/actions';
	import { Button } from '$lib/components/ui/button';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { t } from '$lib/i18n';
	import {
		productVariantsSchema,
		productsSchema,
		type ProductVariantSchema
	} from '$lib/schemas/product';
	import { melt } from '@melt-ui/svelte';
	import { effect } from '@melt-ui/svelte/internal/helpers';
	import { Info, Plus } from 'lucide-svelte';
	import { createRender } from 'svelte-headless-table';
	import { derived } from 'svelte/store';
	import { superForm } from 'sveltekit-superforms/client';
	import AttributesTable from './_components/attributes-table.svelte';
	import VariantForm from './_components/variant-form.svelte';
	import VariantsTable from './_components/variants-table.svelte';

	export let data;
	const { attributes, categories, departments, subCategories, taxes } = data;

	const form = superForm(data.form, { validators: $productsSchema, dataType: 'json' });
	const { tainted, fields } = form;
	const {
		departmentId: { value: departmentId },
		categoryId: { value: categoryId },
		subCategoryId: { value: subCategoryId },
		attributes: { value: attributesField, errors: attributesErrors },
		variants: { value: variantsField }
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

	$: hasAttributeErrors =
		$attributesErrors &&
		Object.values($attributesErrors as Record<number, { values?: { _errors?: string[] } }>).some(
			(attributeItemError) => (attributeItemError.values?._errors?.length ?? 0) > 0
		);

	const NEW_VARIANT_MODAL_ID = 'new-variant-modal';
	const openNewVariantForm = () => {
		openCustomModal({
			closeOnEscape: false,
			closeOnOutsideClick: false,
			id: 'new-variant-modal',
			title: `${$t('common.word.new.capitalize')} ${$t(`entity.variant.singular.capitalize`)}`,
			children: createRender(VariantForm, {
				mode: 'new',
				taxes,
				productAttributes: $attributesField
			})
				.on('cancel', handleCancelNewVariant)
				.on('continue', handleNewVariant),
			content: { class: 'md:min-w-full lg:min-w-[1024px]' }
		});
	};

	const handleNewVariant = async (e: CustomEvent<ProductVariantSchema>) => {
		$variantsField = [...$variantsField, $productVariantsSchema.parse(e.detail)];
		closeModal(NEW_VARIANT_MODAL_ID);
	};

	const handleCancelNewVariant = async () => closeModal(NEW_VARIANT_MODAL_ID);
</script>

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
						<div class="flex gap-2 items-center">
							<h3>{$t('page.inventory.products.new.variants.title')}</h3>
							<Tooltip.Root positioning={{ placement: 'bottom' }}>
								<Tooltip.Trigger asChild let:builder>
									<div use:melt={builder}>
										<Info class="w-4 h-4" />
									</div>
								</Tooltip.Trigger>
								<Tooltip.Content
									sideOffset={4}
									transitionConfig={{ duration: 50 }}
									class="max-w-xs"
								>
									<p class="leading-0">
										{$t('page.inventory.products.new.variants.tooltip')}
									</p>
								</Tooltip.Content>
							</Tooltip.Root>
						</div>

						<Button
							variant="outline"
							on:click={openNewVariantForm}
							disabled={$attributesField.length === 0 || hasAttributeErrors}
						>
							<Plus class="mr-2 h-4 w-4" />
							{$t('common.word.add.capitalize')}
							{$t('entity.variant.singular.lowercase')}
						</Button>
					</div>
					<p>{$t('page.inventory.products.new.variants.subtitle')}</p>
				</div>

				<VariantsTable
					{attributes}
					{taxes}
					data={variantsField}
					productAttributes={$attributesField}
				/>
			</Container>
		</div>
	</div>
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
