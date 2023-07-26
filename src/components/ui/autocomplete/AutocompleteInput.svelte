<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { selectTriggerVariants } from '../select/SelectTrigger.svelte';
	import { getAutocompleteContext } from './Autocomplete.svelte';
	import { cn } from '$lib/utils';

	interface $$Props extends HTMLInputAttributes {}
	let className: string | undefined | null = undefined;
	export { className as class };

	const { input, inputValue } = getAutocompleteContext();
</script>

<input
	melt={$input}
	value={$inputValue}
	class={cn(selectTriggerVariants(), className)}
	{...$$restProps}
/>
