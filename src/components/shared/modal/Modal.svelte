<script lang="ts">
	import Button from '$components/ui/button/Button.svelte';
	import Dialog from '$components/ui/dialog/Dialog.svelte';
	import DialogClose from '$components/ui/dialog/DialogClose.svelte';
	import DialogContent from '$components/ui/dialog/DialogContent.svelte';
	import DialogFooter from '$components/ui/dialog/DialogFooter.svelte';
	import DialogHeader from '$components/ui/dialog/DialogHeader.svelte';
	import DialogTitle from '$components/ui/dialog/DialogTitle.svelte';
	import { X } from 'lucide-svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import type { ModalProps } from './types';

	export let modal: ModalProps;

	const dispatch = createEventDispatcher();

	let loading = false;
	let dialog: Dialog;
	onMount(() => dialog.open());
</script>

<Dialog
	bind:this={dialog}
	on:closed={() => dispatch('closed', modal.id)}
	closeOnEscape={!loading}
	closeOnOutsideClick={!loading}
>
	<DialogContent class="md:min-w-[425px]">
		<DialogHeader>
			<DialogTitle>{modal.title}</DialogTitle>
		</DialogHeader>
		{#if modal.type === 'custom'}
			<svelte:component this={modal.children} />
		{/if}

		{#if modal.type === 'confirmation'}
			{#if modal.children}
				<svelte:component this={modal.children} />
			{/if}
			<DialogFooter class="mt-4">
				<Button
					variant="outline"
					size="sm"
					class={'mt-2 sm:mt-0'}
					on:click={async () => {
						if (modal.type === 'confirmation') await modal.onCancel?.();
						dialog.close();
					}}
					disabled={loading}
				>
					{modal.labels?.cancel ?? 'Cancel'}
				</Button>
				<Button
					size="sm"
					on:click={async () => {
						loading = true;
						if (modal.type === 'confirmation') await modal.onConfirm?.();
						loading = false;
						dialog.close();
					}}
					{loading}
				>
					{modal.labels?.confirm ?? 'Confirm'}
				</Button>
			</DialogFooter>
		{/if}
		<DialogClose
			class="absolute right-2 top-2 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
			disabled={loading}
		>
			<X class="h-4 w-4" />
			<span class="sr-only">Close</span>
		</DialogClose>
	</DialogContent>
</Dialog>
