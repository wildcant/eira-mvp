<script lang="ts" generics="T">
	import { UNEXPECTED_ROW_TYPE } from '$components/crud-data-table';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Popover from '$lib/components/ui/popover';
	import { t } from '$lib/i18n';
	import { cn } from '$lib/utils';
	import { MoreVertical } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import type { BodyRow } from 'svelte-headless-table';

	const dispatch = createEventDispatcher();

	type $$Props = {
		mode: 'default';
		row: BodyRow<T>;
		disabled?: boolean;
	} & {
		mode: 'custom';
	};

	export let mode: 'default' | 'custom' = 'default';
	export let row: BodyRow<T>;
	export let disabled: boolean = false;

	let open = false;
	const close = () => (open = false);
</script>

<Popover.Root positioning={{ placement: 'bottom-start' }} bind:open>
	<Popover.Trigger class={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), '!p-0')}>
		<MoreVertical class="w-4" />
	</Popover.Trigger>
	<Popover.Content class="flex flex-col w-32 !p-0">
		{#if mode == 'custom'}
			<slot {close} />
		{:else}
			<Button
				size="sm"
				variant="ghost"
				class="px-6 rounded-none"
				on:click={() => {
					if (!row.isData()) throw new Error(UNEXPECTED_ROW_TYPE);
					dispatch('edit', row.original);
					close();
				}}
				{disabled}
			>
				{$t('common.word.edit.capitalize')}
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
				{$t('common.word.delete.capitalize')}
			</Button>
		{/if}
	</Popover.Content>
</Popover.Root>
