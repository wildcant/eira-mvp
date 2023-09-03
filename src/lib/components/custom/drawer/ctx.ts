import { getOptionUpdater, removeUndefined } from '$lib/components/internal/index.js';
import { createDialog, type CreateDialogProps, type Dialog as DialogReturn } from '@melt-ui/svelte';
import { getContext, setContext } from 'svelte';

const NAME = 'Drawer';

function set(props: CreateDialogProps) {
	const drawer = createDialog({ ...removeUndefined(props) });
	setContext(NAME, drawer);
	return {
		...drawer,
		updateOption: getOptionUpdater(drawer.options)
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
