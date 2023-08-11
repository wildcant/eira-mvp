<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { t } from '$lib/i18n';
	import { createEventDispatcher, onMount } from 'svelte';
	import { Render } from 'svelte-headless-table';
	import type { ModalProps } from '../types';

	export let modal: ModalProps;

	const dispatch = createEventDispatcher();

	let loading = false;
	let open = true;

	const close = () => (open = false);
	onMount(() => {
		console.log('mounted');
	});
</script>

{#if modal.type === 'confirmation'}
	<AlertDialog.Root bind:open>
		<AlertDialog.Trigger asChild let:trigger>
			<Button builders={[trigger]} variant="outline">Show Dialog</Button>
		</AlertDialog.Trigger>
		<AlertDialog.Content>
			<AlertDialog.Header>
				<AlertDialog.Title>{modal.title}</AlertDialog.Title>
				{#if modal.description}
					<AlertDialog.Description>
						{modal.description}
					</AlertDialog.Description>
				{/if}

				{#if modal.children}
					<!-- <svelte:component this={modal.children} /> -->
					<!-- <Render of={modal.children} /> -->
				{/if}
			</AlertDialog.Header>
			<AlertDialog.Footer>
				<AlertDialog.Cancel
					disabled={loading}
					on:click={async () => {
						if (modal.type === 'confirmation') await modal.onCancel?.();
						close();
					}}
				>
					{modal.labels?.cancel ?? $t('common.word.cancel.capitalize')}
				</AlertDialog.Cancel>
				<AlertDialog.Action
					disabled={loading}
					on:click={async () => {
						loading = true;
						if (modal.type === 'confirmation') await modal.onConfirm?.();
						loading = false;
						close();
					}}
				>
					{modal.labels?.confirm ?? $t('common.word.confirm.capitalize')}
				</AlertDialog.Action>
			</AlertDialog.Footer>
		</AlertDialog.Content>
	</AlertDialog.Root>
{:else if modal.type === 'custom'}
	<!-- on:closed={() => dispatch('closed', modal.id)} -->
	<Dialog.Root closeOnEscape={!loading} closeOnOutsideClick={!loading} bind:open>
		<Dialog.Content class="md:min-w-[425px]">
			<Dialog.Header>
				<Dialog.Title>{modal.title}</Dialog.Title>
			</Dialog.Header>

			<!-- <svelte:component this={modal.children} /> -->
			<Render of={modal.children} />

			<!-- <Dialog.Close
			class="absolute right-2 top-2 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
			disabled={loading}
		>
			<X class="h-4 w-4" />
			<span class="sr-only">{$t('common.word.close.capitalize')}</span>
		</Dialog.Close> -->
		</Dialog.Content>
	</Dialog.Root>
{/if}
