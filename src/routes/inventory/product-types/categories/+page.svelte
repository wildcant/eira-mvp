<script lang="ts">
	import Button from '$components/ui/button/Button.svelte';
	import { t } from '$lib/i18n';
	import { Plus } from 'lucide-svelte';

	export let data;
	const { categoriesJson: initial, newCategoryForm } = data;
	console.log({ initial });
</script>

<div>
	<div class="mb-4 flex justify-between items-center">
		<h2>{initial.meta.total} {$t('page.inventory.product-types.categories.subtitle')}</h2>

		<Button variant="outline" class="min-w-fit">
			<!-- on:click={() =>
				openCustomModal({
					id: NEW_CATEGORY_MODAL_ID,
					title: $t('page.inventory.product-types.categories.new-category'),
					children: NewCategoryModal
				})} -->
			<Plus class="h-4 w-4 md:mr-2" />
			<span class="hidden md:inline">
				{$t('page.inventory.product-types.categories.new-category')}
			</span>
		</Button>
	</div>
</div>
