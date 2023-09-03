<script lang="ts" generics="T">
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Popover from '$lib/components/ui/popover';
	import { MoreVertical } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import type { BodyRow } from 'svelte-headless-table';
	import type { Readable } from 'svelte/motion';

	const dispatch = createEventDispatcher();
	export let row: BodyRow<T>;
	export let editing: Readable<boolean>;

	let open = false;
	const close = () => (open = false);
	$: disabled = $editing;
</script>

<Popover.Root positioning={{ placement: 'bottom-start' }} bind:open>
	<Popover.Trigger class={buttonVariants({ variant: 'ghost' })}>
		<MoreVertical class="w-4" />
	</Popover.Trigger>
	<Popover.Content class="flex flex-col w-32">
		<Button
			size="sm"
			variant="ghost"
			class="px-6 rounded-none"
			on:click={() => {
				dispatch('edit', row);
				close();
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
				close();
			}}
			{disabled}
		>
			Delete
		</Button>
	</Popover.Content>
</Popover.Root>
