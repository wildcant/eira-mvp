<script context="module">
	export const NEW_VARIANT_MODAL_ID = 'new-variant-modal';
</script>

<script lang="ts">
	import type { Tax } from '$lib/api/types';
	import Container from '$lib/components/custom/container/container.svelte';
	import Fieldset from '$lib/components/custom/fieldset/fieldset.svelte';
	import { getFormContext } from '$lib/components/custom/form/components/form.svelte';
	import TagsInputAutocomplete from '$lib/components/custom/tags-input-autocomplete/tags-input-autocomplete.svelte';
	import type { CustomTag } from '$lib/components/custom/tags-input-autocomplete/types';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import * as Select from '$lib/components/ui/select';
	import { t } from '$lib/i18n';
	import {
		computeTotal,
		taxSchema,
		type ProductVariantTax,
		type ProductZodSchema,
		type TaxSchema
	} from '$lib/schemas';
	import { cn } from '$lib/utils';
	import { AlertTriangle } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import type { ZodValidation } from 'sveltekit-superforms';
	import type { SuperForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	export let taxes: Tax[];
	export let index: number;

	const dispatch = createEventDispatcher();

	const {
		form: { form, fields }
	} = getFormContext<SuperForm<ZodValidation<ProductZodSchema>>>();
	const {
		attributes: { value: attributes },
		variants: { value: variants, errors }
	} = fields;

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
		$variants[index].salesTaxes = e.detail.map((tag) => tag.meta);
	};

	$: $variants[index].totalPrice = computeTotal(
		$variants[index].price,
		$variants[index].salesTaxes
	);

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
		$variants[index].purchasesTaxes = e.detail.map((tag) => tag.meta);
	};

	$: $variants[index].totalCost = computeTotal(
		$variants[index].cost,
		$variants[index].purchasesTaxes
	);

	$: attributesErrors =
		$errors?.[0]?.attributes && '_errors' in $errors[0]?.attributes
			? ($errors[0].attributes?._errors as string[] | undefined)
			: undefined;
</script>

<SuperDebug data={{ $form, $errors }} />

<section>
	<div class="grid-area-[characteristics]">
		<Container class="grid gap-4 rounded-md">
			<div>
				<h3>{$t('page.inventory.products.new.characteristics.title')}</h3>
				<p>{$t('page.inventory.products.new.characteristics.subtitle')}</p>
				{#if attributesErrors}
					<div class="flex flex-row gap-2 p-2 border border-destructive">
						<AlertTriangle class="text-destructive" />
						<span class="text-destructive">
							{attributesErrors?.join(',')}
						</span>
					</div>
				{/if}
			</div>

			{#each $attributes as attribute}
				<Fieldset errors={$errors?.[index]?.attributes?.[attribute.id]} let:invalid>
					<Label {invalid} class="capitalize">
						{attribute.name}
					</Label>
					<Select.Root bind:value={$variants[index].attributes[attribute.id].value}>
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
				</Fieldset>
			{/each}
		</Container>
	</div>

	<div class="grid-area-[variant-image]">
		<Container class="grid gap-4 rounded-md">
			<div>
				<h3>{$t('page.inventory.products.new.variant-image.title')}</h3>
				<p>{$t('page.inventory.products.new.variant-image.subtitle')}</p>
			</div>

			<!-- <Uploader on:change={(e) => field.setValue(e.detail.imageId)} /> -->
		</Container>
	</div>

	<div class="grid-area-[sales]">
		<Container class="grid gap-4 rounded-md">
			<div>
				<h3>{$t('page.inventory.products.new.sales.title')}</h3>
				<p>{$t('page.inventory.products.new.sales.subtitle')}</p>
			</div>

			<div class="grid grid-rows-3 gap-4 md:grid-cols-3 md:grid-rows-1">
				<Label>
					{$t('page.inventory.products.new.sales.field.subtotal.label')}
					<Input
						type="number"
						min={0}
						placeholder={$t('page.inventory.products.new.sales.field.subtotal.placeholder')}
						bind:value={$variants[index].price}
					/>
				</Label>

				<Fieldset errors={$errors?.[index]?.salesTaxes?._errors} let:invalid>
					<Label {invalid}>
						{$t('page.inventory.products.new.sales.field.tax.label')}
					</Label>
					<TagsInputAutocomplete
						{invalid}
						allowedTags={salesTaxesTags}
						on:change={handleSalesTaxesChange}
					/>
				</Fieldset>

				<Label>
					{$t('page.inventory.products.new.sales.field.total.label')}
					<Input
						type="text"
						placeholder={$t('page.inventory.products.new.sales.field.subtotal.placeholder')}
						value={`$${$variants[index].totalPrice}`}
						disabled
					/>
				</Label>
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
				<Label>
					{$t('page.inventory.products.new.purchase.field.average-cost.label')}
					<Input
						type="number"
						min={0}
						placeholder={$t('page.inventory.products.new.purchase.field.average-cost.placeholder')}
						bind:value={$variants[index].averageCost}
					/>
				</Label>

				<!-- TODO: Add providers page. Replace input with autocomplete.
					<Label>
						{$t('page.inventory.products.new.purchase.field.provider.label')}
					</Label>
					<Input
						placeholder={$t('page.inventory.products.new.purchase.field.provider.placeholder')}
					/>
				 -->
			</div>

			<h3>{$t('page.inventory.products.new.purchase.subtitle-two')}</h3>

			<div class="grid grid-rows-3 gap-4 md:grid-cols-3 md:grid-rows-1">
				<Label>
					{$t('page.inventory.products.new.purchase.field.subtotal.label')}
					<Input
						type="number"
						min={0}
						placeholder={$t('page.inventory.products.new.purchase.field.subtotal.placeholder')}
						bind:value={$variants[index].cost}
					/>
				</Label>

				<fieldset>
					<Label>
						{$t('page.inventory.products.new.purchase.field.tax.label')}
					</Label>
					<TagsInputAutocomplete
						allowedTags={purchasesTaxes}
						on:change={handlePurchasesTaxesChange}
					/>
				</fieldset>

				<Label>
					{$t('page.inventory.products.new.purchase.field.total.label')}
					<Input
						type="text"
						placeholder={$t('page.inventory.products.new.purchase.field.subtotal.placeholder')}
						value={`$${$variants[index].totalCost}`}
						disabled
					/>
				</Label>
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
				<Fieldset errors={$errors?.[index]?.sku} let:invalid>
					<Label {invalid}>
						{$t('page.inventory.products.new.tracking.field.sku.label')}
						<Input
							{invalid}
							type="text"
							placeholder={$t('page.inventory.products.new.tracking.field.sku.placeholder')}
							bind:value={$variants[index].sku}
						/>
					</Label>
				</Fieldset>

				<Fieldset errors={$errors?.[index]?.barcode} let:invalid>
					<Label {invalid}>
						{$t('page.inventory.products.new.tracking.field.barcode.label')}
						<Input
							{invalid}
							type="text"
							placeholder={$t('page.inventory.products.new.tracking.field.barcode.placeholder')}
							bind:value={$variants[index].barcode}
						/>
					</Label>
				</Fieldset>
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
				<Label>
					{$t('page.inventory.products.new.stock-management.field.qty.label')}
					<Input
						type="number"
						min={0}
						step={1}
						placeholder={$t('page.inventory.products.new.stock-management.field.qty.placeholder')}
						bind:value={$variants[index].stock}
					/>
				</Label>
			</div>
		</Container>
	</div>

	<div class="grid-area-[actions] flex justify-end gap-4 w-full">
		<Button variant="outline" on:click={() => dispatch('cancel')}>
			{$t('common.word.cancel.capitalize')}
		</Button>

		<Button on:click={() => dispatch('continue', index)}>
			{$t('common.word.continue.capitalize')}
		</Button>
	</div>
</section>

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
