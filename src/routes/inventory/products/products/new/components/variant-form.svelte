<script lang="ts">
	import type { Tax } from '$lib/api/types';
	import Container from '$lib/components/custom/container/container.svelte';
	import * as Form from '$lib/components/custom/form';
	import TagsInputAutocomplete from '$lib/components/custom/tags-input-autocomplete/tags-input-autocomplete.svelte';
	import type { CustomTag } from '$lib/components/custom/tags-input-autocomplete/types';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Select from '$lib/components/ui/select';
	import { t } from '$lib/i18n';
	import {
		computeTotal,
		productVariantsSchema,
		taxSchema,
		type ProductSchema,
		type ProductVariantTax,
		type TaxSchema,
		type ProductVariantSchema
	} from '$lib/schemas';
	import { createEventDispatcher, onMount } from 'svelte';
	import { superForm, superValidateSync } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	type $$Props = {
		taxes: Tax[];
		mode: 'new' | 'edit';
		productAttributes: ProductSchema['attributes'];
	} & ({ mode: 'new' } | { mode: 'edit'; defaultValues: ProductVariantSchema });

	export let taxes: $$Props['taxes'];
	export let mode: $$Props['mode'];
	export let productAttributes: $$Props['productAttributes'];

	const dispatch = createEventDispatcher();

	const form = superForm(superValidateSync($productVariantsSchema), {
		SPA: true,
		validators: $productVariantsSchema,
		dataType: 'json',
		invalidateAll: false,
		onUpdate({ form }) {
			if (form.valid) {
				dispatch('continue', form.data);
			}
		}
	});
	const { form: variant, errors } = form;

	// Initialize form with defaults
	let initialized = false;
	onMount(() => {
		$variant.attributes = productAttributes.reduce(
			(obj, attr) => ({ ...obj, [attr.id]: { optional: attr.optional } }),
			{}
		);
		if (mode === 'edit') $variant = $$restProps.defaultValues;
		initialized = true;
	});

	/** Sales */
	type SalesTaxTag = CustomTag<ProductVariantTax>;
	const salesTaxesTags: SalesTaxTag[] = taxes
		.filter((tax) => tax.scope === $taxSchema.shape.scope.enum.sales)
		.map((tax) => ({
			id: tax.id.toString(),
			value: tax.name,
			meta: { id: tax.id, amount: tax.amount, type: tax.type as TaxSchema['type'] }
		}));

	const handleSalesTaxesChange = (e: CustomEvent<SalesTaxTag[]>) => {
		$variant.salesTaxes = e.detail.map((tag) => tag.meta);
	};

	$: $variant.totalPrice = computeTotal($variant.price, $variant.salesTaxes);

	/** Purchases */
	type PurchasesTaxTag = CustomTag<ProductVariantTax>;
	const purchasesTaxes: PurchasesTaxTag[] = taxes
		.filter((tax) => tax.scope === $taxSchema.shape.scope.enum.purchases)
		.map((tax) => ({
			id: tax.id.toString(),
			value: tax.name,
			meta: { id: tax.id, amount: tax.amount, type: tax.type as TaxSchema['type'] }
		}));

	const handlePurchasesTaxesChange = (e: CustomEvent<PurchasesTaxTag[]>) => {
		$variant.purchasesTaxes = e.detail.map((tag) => tag.meta);
	};
	$: $variant.totalCost = computeTotal($variant.cost, $variant.purchasesTaxes);
</script>

<SuperDebug data={{ $variant, $errors }} />

<Form.Root {form} method="post" class="form" id="variant-form">
	<section>
		<div class="grid-area-[characteristics]">
			<Container class="grid gap-4 rounded-md">
				<div>
					<h3>{$t('page.inventory.products.new.characteristics.title')}</h3>
					<p>{$t('page.inventory.products.new.characteristics.subtitle')}</p>
				</div>

				{#if initialized}
					{#each productAttributes as attribute}
						<Form.Field name="attributes" index={attribute.id} let:invalid>
							<Form.Label {invalid} class="capitalize">
								{attribute.name}
							</Form.Label>

							<Select.Root bind:value={$variant.attributes[attribute.id].value}>
								<Select.Trigger {invalid}>
									<Select.Value placeholder="Select attribute value" />
								</Select.Trigger>
								<Select.Content>
									<Select.Group>
										{#each attribute.values as value, index (index)}
											<Select.Item value={value.id} label={value.name}>{value.name}</Select.Item>
										{/each}
									</Select.Group>
								</Select.Content>
								<Select.Input name="favoriteFruit" />
							</Select.Root>
						</Form.Field>
					{/each}
				{/if}
			</Container>
		</div>

		<!-- 
	<div class="grid-area-[variant-image]">
		<Container class="grid gap-4 rounded-md">
			<div>
				<h3>{$t('page.inventory.products.new.variant-image.title')}</h3>
				<p>{$t('page.inventory.products.new.variant-image.subtitle')}</p>
			</div>

			<Uploader on:change={(e) => field.setValue(e.detail.imageId)} />
		</Container>
	</div>
 		-->

		<div class="grid-area-[sales]">
			<Container class="grid gap-4 rounded-md">
				<div>
					<h3>{$t('page.inventory.products.new.sales.title')}</h3>
					<p>{$t('page.inventory.products.new.sales.subtitle')}</p>
				</div>

				<div class="grid grid-rows-3 gap-4 md:grid-cols-3 md:grid-rows-1">
					<Form.Field name="price">
						<Form.Label>
							{$t('page.inventory.products.new.sales.field.subtotal.label')}
						</Form.Label>
						<Form.Input
							type="number"
							min={0}
							placeholder={$t('page.inventory.products.new.sales.field.subtotal.placeholder')}
						/>
					</Form.Field>

					<Form.Field name="salesTaxes" let:invalid>
						<Form.Label>
							{$t('page.inventory.products.new.sales.field.tax.label')}
						</Form.Label>
						<Form.TagsInputAutocomplete
							allowedTags={salesTaxesTags}
							on:change={handleSalesTaxesChange}
						/>
					</Form.Field>

					<Form.Field name="totalPrice">
						<Form.Label>
							{$t('page.inventory.products.new.sales.field.total.label')}
						</Form.Label>
						<Form.Input
							type="text"
							placeholder={$t('page.inventory.products.new.sales.field.subtotal.placeholder')}
							value={`$${$variant.totalPrice}`}
							disabled
						/>
					</Form.Field>
				</div>
			</Container>
		</div>

		<div class="grid-area-[purchase]">
			<Container class="grid gap-4 rounded-md">
				<div>
					<h3>{$t('page.inventory.products.new.purchase.title')}</h3>
					<p>{$t('page.inventory.products.new.purchase.subtitle')}</p>
				</div>

				<div class="grid grid-rows-2 gap-4 md:grid-cols-2 md:grid-rows-1">
					<Form.Field name="averageCost">
						<Form.Label>
							{$t('page.inventory.products.new.purchase.field.average-cost.label')}
						</Form.Label>
						<Form.Input
							type="number"
							min={0}
							placeholder={`
								${$t('page.inventory.products.new.purchase.field.average-cost.placeholder')}
							`}
						/>
					</Form.Field>
					<!-- 
					// TODO: Add providers page. Replace input with autocomplete.
					<Form.Label>
						{$t('page.inventory.products.new.purchase.field.provider.label')}
					</Form.Label>
					<Form.Input
						placeholder={$t('page.inventory.products.new.purchase.field.provider.placeholder')}
					/>
 				-->
				</div>

				<h3>{$t('page.inventory.products.new.purchase.subtitle-two')}</h3>

				<div class="grid grid-rows-3 gap-4 md:grid-cols-3 md:grid-rows-1">
					<Form.Field name="cost">
						<Form.Label>
							{$t('page.inventory.products.new.purchase.field.subtotal.label')}
							<Form.Input
								type="number"
								min={0}
								placeholder={$t('page.inventory.products.new.purchase.field.subtotal.placeholder')}
							/>
						</Form.Label>
					</Form.Field>

					<Form.Field name="purchasesTaxes">
						<Form.Label>
							{$t('page.inventory.products.new.purchase.field.tax.label')}
						</Form.Label>
						<TagsInputAutocomplete
							allowedTags={purchasesTaxes}
							on:change={handlePurchasesTaxesChange}
						/>
					</Form.Field>

					<Form.Field name="totalCost">
						<Form.Label>
							{$t('page.inventory.products.new.purchase.field.total.label')}
						</Form.Label>
						<Form.Input
							type="text"
							placeholder={$t('page.inventory.products.new.purchase.field.subtotal.placeholder')}
							value={`$${$variant.totalCost}`}
							disabled
						/>
					</Form.Field>
				</div>
			</Container>
		</div>

		<div class="grid-area-[barcode]">
			<Container class="grid gap-4 rounded-md">
				<div>
					<h3>{$t('page.inventory.products.new.tracking.title')}</h3>
					<p>{$t('page.inventory.products.new.tracking.subtitle')}</p>
				</div>

				<div class="grid grid-rows-2 gap-4 md:grid-cols-2 md:grid-rows-1">
					<Form.Field name="sku">
						<Form.Label>
							{$t('page.inventory.products.new.tracking.field.sku.label')}
						</Form.Label>
						<Form.Input
							type="text"
							placeholder={$t('page.inventory.products.new.tracking.field.sku.placeholder')}
						/>
					</Form.Field>

					<Form.Field name="barcode">
						<Form.Label>
							{$t('page.inventory.products.new.tracking.field.barcode.label')}
						</Form.Label>
						<Form.Input
							type="text"
							placeholder={$t('page.inventory.products.new.tracking.field.barcode.placeholder')}
						/>
					</Form.Field>
				</div>
			</Container>
		</div>

		<div class="grid-area-[stock-management]">
			<Container class="grid gap-4 rounded-md">
				<div>
					<h3>{$t('page.inventory.products.new.stock-management.title')}</h3>
					<p>{$t('page.inventory.products.new.stock-management.subtitle')}</p>
				</div>

				<div class="grid grid-rows-2 gap-4 md:grid-cols-2 md:grid-rows-1">
					<Form.Field name="stock">
						<Form.Label>
							{$t('page.inventory.products.new.stock-management.field.qty.label')}
						</Form.Label>
						<Form.Input
							type="number"
							min={0}
							step={1}
							placeholder={$t('page.inventory.products.new.stock-management.field.qty.placeholder')}
						/>
					</Form.Field>
				</div>
			</Container>
		</div>

		<div class="grid-area-[actions] flex justify-end gap-4 w-full">
			<Button variant="outline" on:click={() => dispatch('cancel')}>
				{$t('common.word.cancel.capitalize')}
			</Button>

			<Button type="submit">
				{$t('common.word.continue.capitalize')}
			</Button>
		</div>
	</section>
</Form.Root>

<style>
	section {
		display: grid;
		gap: 1rem;
		grid-template-areas:
			'variant-image'
			'characteristics'
			'sales'
			'purchase'
			'barcode'
			'stock-management'
			'actions';
	}

	@media (min-width: 1024px) {
		section {
			grid-template-columns: 1fr 1fr;
			grid-template-areas:
				'characteristics variant-image'
				'sales sales'
				'purchase purchase'
				'barcode barcode'
				'stock-management stock-management'
				'actions actions';
		}
	}
</style>
