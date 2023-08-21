<script context="module">
	export const NEW_VARIANT_MODAL_ID = 'new-variant-modal';
</script>

<script lang="ts">
	import Uploader from '$components/uploader/uploader.svelte';
	import Container from '$lib/components/custom/container/container.svelte';
	import * as Form from '$lib/components/custom/form';
	import Button from '$lib/components/ui/button/button.svelte';
	import { t } from '$lib/i18n';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
</script>

<section>
	<div class="grid-area-[variant-image]">
		<Container class="grid gap-4 rounded-md">
			<div>
				<h3>{$t('page.inventory.products.new.variant-image.title')}</h3>
				<p>{$t('page.inventory.products.new.variant-image.subtitle')}</p>
			</div>

			<Form.Field name="imageId" let:field>
				<Uploader on:change={(e) => field.setValue(e.detail.imageId)} />
			</Form.Field>
		</Container>
	</div>

	<div class="grid-area-[characteristics]">
		<Container class="grid gap-4 rounded-md">
			<div>
				<h3>{$t('page.inventory.products.new.characteristics.title')}</h3>
				<p>{$t('page.inventory.products.new.characteristics.subtitle')}</p>
			</div>
		</Container>
	</div>

	<div class="grid-area-[sales]">
		<Container class="grid gap-4 rounded-md">
			<div>
				<h3>{$t('page.inventory.products.new.sales.title')}</h3>
				<p>{$t('page.inventory.products.new.sales.subtitle')}</p>
			</div>

			<div class="grid grid-rows-3 gap-4 md:grid-cols-3 md:grid-rows-1">
				<Form.Field name="name">
					<Form.Label>
						{$t('page.inventory.products.new.sales.field.subtotal.label')}
					</Form.Label>
					<Form.Input
						type="text"
						placeholder={$t('page.inventory.products.new.sales.field.subtotal.placeholder')}
					/>
				</Form.Field>

				<Form.Field name="name">
					<Form.Label>
						{$t('page.inventory.products.new.sales.field.tax.label')}
					</Form.Label>
					<Form.Input
						type="text"
						placeholder={$t('page.inventory.products.new.sales.field.subtotal.placeholder')}
					/>
				</Form.Field>

				<Form.Field name="name">
					<Form.Label>
						{$t('page.inventory.products.new.sales.field.total.label')}
					</Form.Label>
					<Form.Input
						type="text"
						placeholder={$t('page.inventory.products.new.sales.field.subtotal.placeholder')}
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
				<Form.Field name="name">
					<Form.Label>
						{$t('page.inventory.products.new.purchase.field.average-cost.label')}
					</Form.Label>
					<Form.Input
						type="text"
						placeholder={$t('page.inventory.products.new.purchase.field.average-cost.placeholder')}
					/>
				</Form.Field>

				<Form.Field name="name">
					<Form.Label>
						{$t('page.inventory.products.new.purchase.field.provider.label')}
					</Form.Label>
					<Form.Input
						type="text"
						placeholder={$t('page.inventory.products.new.purchase.field.provider.placeholder')}
					/>
				</Form.Field>
			</div>

			<h3>{$t('page.inventory.products.new.purchase.subtitle-two')}</h3>

			<div class="grid grid-rows-3 gap-4 md:grid-cols-3 md:grid-rows-1">
				<Form.Field name="name">
					<Form.Label>
						{$t('page.inventory.products.new.purchase.field.subtotal.label')}
					</Form.Label>
					<Form.Input
						type="text"
						placeholder={$t('page.inventory.products.new.purchase.field.subtotal.placeholder')}
					/>
				</Form.Field>

				<Form.Field name="name">
					<Form.Label>
						{$t('page.inventory.products.new.purchase.field.tax.label')}
					</Form.Label>
					<Form.Input
						type="text"
						placeholder={$t('page.inventory.products.new.purchase.field.subtotal.placeholder')}
					/>
				</Form.Field>

				<Form.Field name="name">
					<Form.Label>
						{$t('page.inventory.products.new.purchase.field.total.label')}
					</Form.Label>
					<Form.Input
						type="text"
						placeholder={$t('page.inventory.products.new.purchase.field.subtotal.placeholder')}
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
				<Form.Field name="name">
					<Form.Label>
						{$t('page.inventory.products.new.tracking.field.sku.label')}
					</Form.Label>
					<Form.Input
						type="text"
						placeholder={$t('page.inventory.products.new.tracking.field.sku.placeholder')}
					/>
				</Form.Field>

				<Form.Field name="name">
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
				<Form.Field name="name">
					<Form.Label>
						{$t('page.inventory.products.new.stock-management.field.qty.label')}
					</Form.Label>
					<Form.Input
						type="text"
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

		<Button on:click={() => dispatch('continue')}>
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
				'variant-image characteristics'
				'sales sales'
				'purchase purchase'
				'barcode barcode'
				'stock-management stock-management'
				'actions actions';
		}
	}
</style>
