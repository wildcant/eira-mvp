<script lang="ts">
	import Button from '$components/ui/button/Button.svelte';
	import FloatingAction from '$components/ui/floating-action/FloatingAction.svelte';
	import Separator from '$components/ui/separator/Separator.svelte';
	import { openToast } from '$components/ui/toast/ToastManager.svelte';
	import type { DatabaseTypes } from '$lib/database/types';
	import { t } from '$lib/i18n';
	import { editing } from '../store';

	async function updateCategory(category: DatabaseTypes['Category']) {
		editing.update((currentEditing) => ({ ...currentEditing, loading: true }));
		try {
			const response = await fetch(`/api/products/categories.json/${category.id}`, {
				method: 'put',
				body: JSON.stringify(category)
			});

			const json = await response.json();

			if (!response.ok) throw new Error(json.message);

			openToast({
				data: { variant: 'default', title: 'All good', description: 'Category updated' }
			});
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : '';

			openToast({
				data: { variant: 'destructive', title: 'Error', description: errorMessage }
			});
		} finally {
			editing.set({ state: false });
		}
	}
</script>

{#if $editing.state}
	<FloatingAction>
		<Button
			variant="link"
			class="text-background"
			disabled={$editing.loading}
			on:click={() => editing.set({ state: false })}
		>
			{$t('common.word.cancel.capitalize')}
		</Button>

		<Separator class="h-4	bg-zinc-800" orientation="vertical" />

		{@const category = $editing.category}
		<Button
			variant="link"
			class="text-background"
			loading={$editing.loading}
			on:click={() => updateCategory(category)}
		>
			{$t('common.word.save.capitalize')}
		</Button>
	</FloatingAction>
{/if}
