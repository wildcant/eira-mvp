<script lang="ts">
	import { Check } from 'lucide-svelte';
	import { selectItemVariants } from '../select/SelectItem.svelte';
	import { getAutocompleteContext, type Option } from './Autocomplete.svelte';
	import { cn } from '$lib/utils';

	export let option: Option;
	export let index: number;
	const { isSelected, item } = getAutocompleteContext();
</script>

<li
	class={cn(
		selectItemVariants(),
		'data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground'
	)}
	melt={$item({
		index,
		item: option,
		disabled: option?.meta?.disabled
	})}
	{...$$restProps}
>
	{#if $isSelected(option)}
		<span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
			<Check class="h-4 w-4" />
		</span>
	{/if}

	<slot />
</li>
