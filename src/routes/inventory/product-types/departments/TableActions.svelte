<script lang="ts">
	import Button from '$components/ui/button/Button.svelte';
	import Popover from '$components/ui/popover/Popover.svelte';
	import PopoverContent from '$components/ui/popover/PopoverContent.svelte';
	import PopoverTrigger from '$components/ui/popover/PopoverTrigger.svelte';
	import type { DatabaseTypes } from '$lib/database/types';
	import { MoreVertical } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import { deleting, editing } from './store';

	export let department: DatabaseTypes['Department'];

	const dispatch = createEventDispatcher();

	let popover: Popover;
</script>

<Popover placement="bottom-start" bind:this={popover}>
	<PopoverTrigger variant="ghost" disabled={$editing || $deleting}>
		<MoreVertical class="w-4" />
	</PopoverTrigger>
	<PopoverContent class="flex flex-col w-32">
		<Button
			size="sm"
			variant="ghost"
			class="px-6 rounded-none"
			disabled={$deleting}
			on:click={() => {
				popover.close();
				editing.set(true);
				dispatch('edit', department);
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
			on:click={async () => {
				deleting.set(true);
				fetch(`/api/products/departments.json/${department.id}`, { method: 'delete' })
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
			}}
		>
			Delete
		</Button>
	</PopoverContent>
</Popover>
