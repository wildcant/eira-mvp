<script lang="ts" context="module">
	import { uniqueContext } from '$components/helpers/uniqueContext';
	import { createSelect } from '@melt-ui/svelte';
	import { createEventDispatcher } from 'svelte';

	type SelectContextProps = Omit<
		ReturnType<typeof createSelect>,
		'arrow' | 'open' | 'options' | 'value' | 'input'
	> & {
		groupId: number;
		enumerateGroup: () => void;
	};
	export const { getContext: getSelectContext, setContext: setSelectContext } =
		uniqueContext<SelectContextProps>();
</script>

<script lang="ts">
	export let value: unknown | undefined = undefined;

	let groups = 0;
	const {
		label,
		trigger,
		menu,
		option,
		isSelected,
		group,
		groupLabel,
		separator,
		value: valueParam
	} = createSelect();

	setSelectContext({
		label,
		trigger,
		menu,
		option,
		isSelected,
		group,
		groupLabel,
		separator,
		groupId: groups,
		enumerateGroup: () => (groups += 1)
	});

	const dispatch = createEventDispatcher();
	$: valueParam.set(value);
	valueParam.subscribe((v) => {
		if (v !== valueParam) {
			dispatch('change', v as string);
			// avoid unsetting default value on mount. tricky I know :<
			if (v) value = v;
		}
	});
</script>

<slot />
