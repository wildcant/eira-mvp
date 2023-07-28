<script lang="ts">
	import Button from '$components/ui/button/Button.svelte';
	import FloatingAction from '$components/ui/floating-action/FloatingAction.svelte';
	import Separator from '$components/ui/separator/Separator.svelte';
	import { openToast } from '$components/ui/toast/ToastManager.svelte';
	import type { Category } from '$lib/api/types';
	import { t } from '$lib/i18n';
	import { editing } from '../store';

	async function updateCategory(category: Category) {
		editing.update((currentEditing) => ({ ...currentEditing, loading: true }));
		try {
			const { name, departmentId } = category;

			const response = await fetch(`/api/products/categories.json/${category.id}`, {
				method: 'put',
				body: JSON.stringify({ name, departmentId })
			});

			const json = await response.json();

			if (!response.ok) throw new Error(json.message);

			openToast({
				data: {
					variant: 'default',
					title: $t('common.action-completed'),
					description: `${$t('entity.category.singular.capitalize')} ${$t(
						'common.word.updated.lowercase'
					)}`
				}
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
