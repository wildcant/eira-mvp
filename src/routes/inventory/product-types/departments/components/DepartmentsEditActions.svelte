<script lang="ts">
	import Button from '$components/ui/button/Button.svelte';
	import FloatingAction from '$components/ui/floating-action/FloatingAction.svelte';
	import Separator from '$components/ui/separator/Separator.svelte';
	import { openToast } from '$components/ui/toast/ToastManager.svelte';
	import type { DatabaseTypes } from '$lib/database/types';
	import { t } from '$lib/i18n';
	import { editing } from '../store';

	async function updateDepartment(department: DatabaseTypes['Department']) {
		editing.update((currentEditing) => ({ ...currentEditing, loading: true }));
		try {
			const response = await fetch(`/api/products/departments.json/${department.id}`, {
				method: 'put',
				body: JSON.stringify({ name: department.name, color: department.color })
			});

			const json = await response.json();

			if (!response.ok) throw new Error(json.message);

			openToast({
				data: { variant: 'default', title: 'All good', description: 'Department updated' }
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
			{$t('page.inventory.product-types.departments.table.actions.edit.cancel')}
		</Button>

		<Separator class="h-4	bg-zinc-800" orientation="vertical" />

		{@const department = $editing.department}
		<Button
			variant="link"
			class="text-background"
			loading={$editing.loading}
			on:click={() => updateDepartment(department)}
		>
			{$t('page.inventory.product-types.departments.table.actions.edit.save')}
		</Button>
	</FloatingAction>
{/if}
