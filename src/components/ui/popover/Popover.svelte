<script lang="ts" context="module">
	import { uniqueContext } from '$lib/helpers/uniqueContext';
	import { createPopover } from '@melt-ui/svelte';

	type PopoverContextProps = Omit<ReturnType<typeof createPopover>, 'options'>;
	export const { getContext: getPopoverContext, setContext: setPopoverContext } =
		uniqueContext<PopoverContextProps>();
</script>

<script lang="ts">
	import type { FloatingConfig } from '@melt-ui/svelte/internal/actions';

	export let placement: FloatingConfig['placement'] = 'top';
	const {
		trigger,
		content,
		open,
		arrow,
		close: closePopover
	} = createPopover({
		positioning: { placement }
	});
	setPopoverContext({ trigger, content, open, arrow, close: closePopover });

	export function close() {
		open.set(false);
	}
</script>

<slot />
