<script>
	import Uploader from '$components/shared/uploader/Uploader.svelte';
	import Button from '$components/ui/button/Button.svelte';
	import Container from '$components/ui/container/Container.svelte';
	import Form from '$components/ui/form/Form.svelte';
	import FormAutocomplete from '$components/ui/form/FormAutocomplete.svelte';
	import FormField from '$components/ui/form/FormField.svelte';
	import FormInput from '$components/ui/form/FormInput.svelte';
	import FormLabel from '$components/ui/form/FormLabel.svelte';
	import FormTextarea from '$components/ui/form/FormTextarea.svelte';
	import { t } from '$lib/i18n';
	import { productsSchema } from '$lib/schemas/product';
	import { Plus } from 'lucide-svelte';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;

	const form = superForm(data.form, { validators: $productsSchema });
	const { tainted } = form;
	// $: console.log($frm);
</script>

<Form {form} method="post" class="form">
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

				<FormField name="name">
					<FormLabel>
						{$t('page.inventory.products.new.basic-information.field.name.label')}
					</FormLabel>
					<FormInput
						type="text"
						placeholder={$t('page.inventory.products.new.basic-information.field.name.placeholder')}
					/>
				</FormField>

				<FormField name="description">
					<FormLabel>
						{$t('page.inventory.products.new.basic-information.field.description.label')}
					</FormLabel>
					<FormTextarea
						placeholder={$t(
							'page.inventory.products.new.basic-information.field.description.placeholder'
						)}
					/>
				</FormField>
			</Container>
		</div>

		<div class="grid-area-[categorization]">
			<Container class="grid gap-4 rounded-md">
				<div>
					<h3>{$t('page.inventory.products.new.categorization.title')}</h3>
					<p>{$t('page.inventory.products.new.categorization.subtitle')}</p>
				</div>

				<FormField name="departmentId">
					<FormLabel>
						{$t('entity.department.singular.capitalize')}
					</FormLabel>
					<FormAutocomplete options={[]} />
				</FormField>

				<FormField name="categoryId">
					<FormLabel>
						{$t('entity.category.singular.capitalize')}
					</FormLabel>
					<FormAutocomplete options={[]} />
				</FormField>

				<FormField name="subCategoryId">
					<FormLabel>
						{$t('entity.sub-category.singular.capitalize')}
					</FormLabel>
					<FormAutocomplete options={[]} />
				</FormField>
			</Container>
		</div>

		<div class="grid-area-[image]">
			<Container class="grid gap-4 rounded-md">
				<div>
					<h3>{$t('page.inventory.products.new.image.title')}</h3>
					<p>{$t('page.inventory.products.new.image.subtitle')}</p>
				</div>

				<Uploader />
			</Container>
		</div>

		<div class="grid-area-[attributes]">
			<Container class="grid gap-4 rounded-md">
				<div>
					<h3>{$t('page.inventory.products.new.attributes.title')}</h3>
					<p>{$t('page.inventory.products.new.attributes.subtitle')}</p>
				</div>

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
			</Container>
		</div>
	</div>
</Form>

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

		@media (min-width: 1024px) {
			grid-template-columns: 3fr 2fr;
			grid-template-areas:
				'basic-info categorization'
				'attributes image'
				'variants variants';
		}
	}
</style>
