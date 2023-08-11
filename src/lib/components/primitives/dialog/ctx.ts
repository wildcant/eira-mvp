import { createDialog, type CreateDialogProps, type Dialog as DialogReturn } from '@melt-ui/svelte';
import { getContext, setContext } from 'svelte';
import { getOptionUpdater, removeUndefined } from '$lib/components/internal/index.js';

const NAME = 'Dialog';

function set(props: CreateDialogProps) {
	const dialog = createDialog({ ...removeUndefined(props), role: 'dialog' });
	setContext(NAME, dialog);
	return {
		...dialog,
		updateOption: getOptionUpdater(dialog.options)
	};
}

function get() {
	return getContext<DialogReturn>(NAME);
}

export const ctx = {
	set,
	get,
	getClose: () => get().elements.close,
	getContent: () => get().elements.content,
	getOverlay: () => get().elements.overlay,
	getPortal,
	getTitle: () => get().elements.title,
	getDescription: () => get().elements.description,
	getTrigger: () => get().elements.trigger
};

function getPortal() {
	const {
		elements: { portalled },
		states: { open }
	} = get();

	return {
		portal: portalled,
		open
	};
}
