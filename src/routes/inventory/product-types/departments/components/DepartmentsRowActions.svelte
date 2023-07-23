<script lang="ts">
	import Button from '$components/ui/button/Button.svelte';
	import Popover from '$components/ui/popover/Popover.svelte';
	import PopoverContent from '$components/ui/popover/PopoverContent.svelte';
	import PopoverTrigger from '$components/ui/popover/PopoverTrigger.svelte';
	import type { DatabaseTypes } from '$lib/database/types';
	import { MoreVertical } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import { deleting, editing } from '../store';
	import { openConfirmationModal } from '$components/shared/modal/ModalsManager.svelte';

	export let department: DatabaseTypes['Department'];

	const dispatch = createEventDispatcher();

	let popover: Popover;

	async function deleteDepartment() {
		deleting.set(true);
		return fetch(`/api/products/departments.json/${department.id}`, { method: 'delete' })
			.then((response) => response.json())
			.then((json) => {
				if (json.suceded) {
					dispatch('deleted');
				}
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				popover?.close();
				deleting.set(false);
			});
	}
</script>

<Popover placement="bottom-start" bind:this={popover}>
	<PopoverTrigger variant="ghost" disabled={$editing.state || $deleting}>
		<MoreVertical class="w-4" />
	</PopoverTrigger>
	<PopoverContent class="flex flex-col w-32">
		<Button
			size="sm"
			variant="ghost"
			class="px-6 rounded-none"
			disabled={$deleting}
			on:click={() => {
				editing.set({ state: true, department });
				popover.close();
			}}
		>
			Edit
		</Button>

		<Button
			size="sm"
			variant="ghost"
			class="px-6 rounded-none"
			loading={$deleting}
			disabled={$deleting}
			on:click={() =>
				openConfirmationModal({
					id: 'delete-department',
					title: `Are you sure you want to delete the ${department.name} department?`,
					onConfirm: deleteDepartment
				})}
		>
			Delete
		</Button>
	</PopoverContent>
</Popover>
