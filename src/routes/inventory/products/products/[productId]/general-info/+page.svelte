<script lang="ts">
	import * as Form from '$lib/components/custom/form';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { t } from '$lib/i18n';
	import { productCategorizationSchema, productsSchema } from '$lib/schemas';
	import { Image } from 'lucide-svelte';
	import CategorizationForm from '../_components/categorization-form.svelte';
	import Patch from '../_components/patch.svelte';

	export let data;
</script>

<section class="flex w-full justify-between my-4">
	<div>
		<h4>Default photo</h4>
		<div class="w-10 h-8">
			{#if data.image}
				<img src={data.image.url} alt="product" />
			{:else}
				<Image class="w-full h-full" />
			{/if}
		</div>
	</div>

	<Button variant="link" class="underline !p-0 !h-6">Edit</Button>
</section>

<Separator class="my-4" decorative />

<h4>Product Basics</h4>

<Patch action="?/name" form={data.forms.name} validators={$productsSchema.pick({ name: true })}>
	<h5 slot="title">Product name</h5>
	<div slot="view">
		<span class="font-extralight">{data.name}</span>
	</div>
	<div slot="edit">
		<Form.Field name="name">
			<Form.Label>
				{$t('page.inventory.products.new.basic-information.field.name.label')}
			</Form.Label>
			<Form.Input
				type="text"
				placeholder={$t('page.inventory.products.new.basic-information.field.name.placeholder')}
			/>
		</Form.Field>
	</div>
</Patch>

<Separator class="my-4" decorative subtle />

<Patch
	action="?/description"
	form={data.forms.description}
	validators={$productsSchema.pick({ description: true })}
>
	<h5 slot="title">Product description</h5>
	<div slot="view">
		<p class="font-extralight">{data.description ?? ''}</p>
	</div>
	<div slot="edit">
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
	</div>
</Patch>

<Separator class="my-4" decorative subtle />

<Patch
	action="?/categorization"
	form={data.forms.categorization}
	validators={$productCategorizationSchema}
>
	<h5 slot="title">Product category</h5>
	<div slot="view">
		<p class="font-extralight"><span>Department</span>: {data.department?.name ?? ''}</p>
		<p class="font-extralight"><span>Category</span>: {data.category?.name ?? ''}</p>
		<p class="font-extralight"><span>Subcategory</span>: {data.subCategory?.name ?? ''}</p>
	</div>
	<div slot="edit">
		{#await Promise.all([data.loadDepartments, data.loadCategories, data.loadSubCategories])}
			Loading options...
		{:then [{ data: departments }, { data: categories }, { data: subCategories }]}
			<!-- TODO: Fix categorization form sending empty object on submit. -->
			<CategorizationForm {departments} {categories} {subCategories} />
		{:catch error}
			{error.message}
		{/await}
	</div>
</Patch>
