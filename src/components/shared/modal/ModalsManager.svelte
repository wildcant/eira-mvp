<script lang="ts" context="module">
	import { writable } from 'svelte/store';
	import type { ModalProps, CustomModalProps, ConfirmationModalProps } from './types';

	const modals = writable<ModalProps[]>([]);
	export function openCustomModal(modal: Omit<CustomModalProps, 'type'>) {
		modals.update((currentModals) => currentModals.concat({ ...modal, type: 'custom' }));
	}
	export function openConfirmationModal(modal: Omit<ConfirmationModalProps, 'type'>) {
		modals.update((currentModals) => currentModals.concat({ ...modal, type: 'confirmation' }));
	}
	async function closeModal(modalId: string) {
		// Wait 100 ms for the close animation.
		await new Promise((resolve) => setTimeout(resolve, 100));
		modals.update((currentModals) => currentModals.filter((m) => m.id !== modalId));
	}
</script>

<script lang="ts">
	import Modal from './Modal.svelte';
</script>

{#each $modals as modal (modal.id)}
	<Modal {modal} on:closed={() => closeModal(modal.id)} />
{/each}
