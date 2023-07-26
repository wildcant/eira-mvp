<script lang="ts">
	import { openConfirmationModal } from '$components/shared/modal/ModalsManager.svelte';
	import Button from '$components/ui/button/Button.svelte';
	import Popover from '$components/ui/popover/Popover.svelte';
	import PopoverContent from '$components/ui/popover/PopoverContent.svelte';
	import PopoverTrigger from '$components/ui/popover/PopoverTrigger.svelte';
	import { openToast } from '$components/ui/toast/ToastManager.svelte';
	import type { DatabaseTypes } from '$lib/database/types';
	import { t } from '$lib/i18n';
	import { MoreVertical } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import { editing } from '../store';

	export let category: DatabaseTypes['Category'];

	const dispatch = createEventDispatcher();

	let popover: Popover;

	let loading = false;
	async function deleteCategory() {
		loading = true;
		try {
			const response = await fetch(`/api/products/categories.json/${category.id}`, {
				method: 'delete'
			});

			const json = await response.json();

			if (!response.ok) throw new Error(json.message);

			dispatch('deleted');

			openToast({
				data: {
					variant: 'default',
					title: $t('common.phrase.action-completed'),
					description: `${$t('entity.category.singular.capitalize')} ${$t(
						'common.phrase.was-deleted'
					)}`
				}
			});
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : '';

			openToast({
				data: { variant: 'destructive', title: 'Error', description: errorMessage }
			});
		} finally {
			popover?.close();
			loading = false;
		}
	}
</script>

<Popover placement="bottom-start" bind:this={popover}>
	<PopoverTrigger variant="ghost" disabled={$editing.state || loading}>
		<MoreVertical class="w-4" />
	</PopoverTrigger>
	<PopoverContent class="flex flex-col w-32">
		<Button
			size="sm"
			variant="ghost"
			class="px-6 rounded-none"
			disabled={loading}
			on:click={() => {
				editing.set({ state: true, category });
				popover.close();
			}}
		>
			{$t('common.word.edit.capitalize')}
		</Button>

		<Button
			size="sm"
			variant="ghost"
			class="px-6 rounded-none"
			{loading}
			disabled={loading}
			on:click={() =>
				openConfirmationModal({
					id: 'delete-category',
					title: `${$t('common.phrase.confirm-delete')} "${category.name}"?`,
					onConfirm: deleteCategory
				})}
		>
			{$t('common.word.delete.capitalize')}
		</Button>
	</PopoverContent>
</Popover>
