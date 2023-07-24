<script lang="ts">
	import { cn } from '$lib/utils';
	import { getSelectContext } from './Select.svelte';

	let className: string | undefined | null = undefined;
	export { className as class };
	export let label: string;

	const { group, groupLabel, enumerateGroup } = getSelectContext();

	const index = enumerateGroup();
	const groupKey = `select-group-${index}`;
</script>

<div melt={$group(groupKey)} class={cn(className)} {...$$restProps}>
	<div
		melt={$groupLabel(groupKey)}
		class={cn('py-1.5 pl-8 pr-2 text-sm font-semibold', className)}
		{...$$restProps}
	>
		{label}
	</div>

	<slot />
</div>
