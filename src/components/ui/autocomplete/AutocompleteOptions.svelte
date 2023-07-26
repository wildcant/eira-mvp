<script lang="ts">
	import { cn } from '$lib/utils';
	import { selectContentVariants } from '../select/SelectContent.svelte';
	import { getAutocompleteContext } from './Autocomplete.svelte';

	const { filteredItems, menu } = getAutocompleteContext();
</script>

<ul melt={$menu} class={cn(selectContentVariants(), 'z-[190]')}>
	<slot filteredOptions={$filteredItems} />
</ul>
