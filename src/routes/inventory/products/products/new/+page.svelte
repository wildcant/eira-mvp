<script lang="ts">
	import { Uploader } from '$components/uploader';
	import { Container } from '$lib/components/custom/container';
	import * as Form from '$lib/components/custom/form';
	import { Button } from '$lib/components/ui/button';
	import { t } from '$lib/i18n';
	import { productsSchema } from '$lib/schemas/product';
	import { Plus } from 'lucide-svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import AttributesTable from './components/AttributesTable.svelte';

	export let data;
	const { productsAttributes } = data;

	const form = superForm(data.form, { validators: $productsSchema });
	const { tainted, form: frm } = form;
	// let src: File | undefined = undefined;
	$: console.log($frm);
</script>

<Form.Root {form} method="post" class="form">
	<div class="flex justify-between items-center mb-4">
		<h2 class="p-0">
			{$t('common.word.new.capitalize')}
			{$t('entity.product.singular.lowercase')}
		</h2>
		<Button disabled={!$tainted}>Guardar</Button>
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
					<Form.Autocomplete options={[]} />
				</Form.Field>

				<Form.Field name="categoryId">
					<Form.Label>
						{$t('entity.category.singular.capitalize')}
					</Form.Label>
					<Form.Autocomplete options={[]} />
				</Form.Field>

				<Form.Field name="subCategoryId">
					<Form.Label>
						{$t('entity.sub-category.singular.capitalize')}
					</Form.Label>
					<Form.Autocomplete options={[]} />
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

				<AttributesTable {productsAttributes} />

				<Button type="button" variant="link">
					<Plus class="mr-2 h-4 w-4" />
					{$t('common.word.add.capitalize')}
				</Button>
			</Container>
		</div>

		<div class="grid-area-[variants]">
			<Container class="grid gap-4 rounded-md">
				<div>
					<div class="flex justify-between">
						<h3>{$t('page.inventory.products.new.variants.title')}</h3>

						<Button type="button" variant="outline">
							<Plus class="mr-2 h-4 w-4" />
							{$t('common.word.add.capitalize')}
							{$t('entity.variant.singular.lowercase')}
						</Button>
					</div>
					<p>{$t('page.inventory.products.new.variants.subtitle')}</p>
				</div>
				<!-- <VariantsTable /> -->
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
