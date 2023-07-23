<script lang="ts" context="module">
	import { uniqueContext } from '$components/helpers/uniqueContext';
	import { createDialog, type CreateDialogProps } from '@melt-ui/svelte';
	import { createEventDispatcher } from 'svelte';

	type DialogContextProps = Omit<ReturnType<typeof createDialog>, 'options'>;
	export const { getContext: getDialogContext, setContext: setDialogContext } =
		uniqueContext<DialogContextProps>();
</script>

<script lang="ts">
	export let closeOnEscape: CreateDialogProps['closeOnEscape'] = true;
	export let closeOnOutsideClick: CreateDialogProps['closeOnOutsideClick'] = true;

	const dialog = createDialog({ closeOnEscape, closeOnOutsideClick });
	setDialogContext(dialog);

	// Update options when props change
	$: dialog.options.update((currentOptions) => ({
		...currentOptions,
		closeOnEscape: !!closeOnEscape,
		closeOnOutsideClick: !!closeOnOutsideClick
	}));

	export const open = () => dialog?.open.set(true);
	export const close = () => dialog?.open.set(false);

	const dispatch = createEventDispatcher();
	dialog?.open.subscribe((isOpen) => {
		if (!isOpen) dispatch('closed');
	});
</script>

<slot />
