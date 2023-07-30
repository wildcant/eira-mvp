<script lang="ts" generics="T">
	import type { Readable } from 'svelte/motion';

	import Button from '$components/ui/button/Button.svelte';
	import Popover from '$components/ui/popover/Popover.svelte';
	import PopoverContent from '$components/ui/popover/PopoverContent.svelte';
	import PopoverTrigger from '$components/ui/popover/PopoverTrigger.svelte';
	import { MoreVertical } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import type { BodyRow } from 'svelte-headless-table';

	const dispatch = createEventDispatcher();
	export let row: BodyRow<T>;
	export let editing: Readable<boolean>;

	let popover: Popover;
	$: disabled = $editing;
</script>

<Popover placement="bottom-start" bind:this={popover}>
	<PopoverTrigger variant="ghost">
		<MoreVertical class="w-4" />
	</PopoverTrigger>
	<PopoverContent class="flex flex-col w-32">
		<Button
			size="sm"
			variant="ghost"
			class="px-6 rounded-none"
			on:click={() => {
				dispatch('edit', row);
				popover.close();
			}}
			{disabled}
		>
			Edit
		</Button>

		<Button
			size="sm"
			variant="ghost"
			class="px-6 rounded-none"
			on:click={() => {
				dispatch('delete', row);
				popover.close();
			}}
			{disabled}
		>
			Delete
		</Button>
	</PopoverContent>
</Popover>
