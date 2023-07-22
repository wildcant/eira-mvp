<script lang="ts" context="module">
	import { uniqueContext } from '$components/helpers/uniqueContext';
	import { createDialog } from '@melt-ui/svelte';

	type DialogContextProps = Omit<ReturnType<typeof createDialog>, 'options'>;
	export const { getContext: getDialogContext, setContext: setDialogContext } =
		uniqueContext<DialogContextProps>();
</script>

<script lang="ts">
	const {
		trigger,
		portal,
		overlay,
		content,
		title,
		description,
		close,
		open: openDialog
	} = createDialog();
	setDialogContext({
		trigger,
		portal,
		overlay,
		content,
		title,
		description,
		close,
		open: openDialog
	});

	export function open() {
		openDialog.set(true);
	}
</script>

<slot />
