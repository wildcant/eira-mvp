<script lang="ts" context="module">
	import { uniqueContext } from '$components/helpers/uniqueContext';
	import { createCollapsible, type CreateCollapsibleProps } from '@melt-ui/svelte';

	type DisclosureContextProps = ReturnType<typeof createCollapsible>;
	export const { getContext: getDisclosureContext, setContext: setDisclosureContext } =
		uniqueContext<DisclosureContextProps>();
</script>

<script lang="ts">
	let className: string | undefined | null = undefined;
	export { className as class };
	let initialState: CreateCollapsibleProps['open'] = false;
	export { initialState as open };

	const { open, root, content, trigger, disabled } = createCollapsible({
		open: initialState
	});
	setDisclosureContext({ open, root, content, trigger, disabled });
</script>

<div melt={$root} class={className}>
	<slot />
</div>
