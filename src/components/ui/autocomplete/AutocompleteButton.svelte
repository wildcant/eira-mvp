<script lang="ts">
	import { ChevronDown, ChevronUp } from 'lucide-svelte';
	import { getAutocompleteContext } from './Autocomplete.svelte';

	const { open } = getAutocompleteContext();
</script>

<div class="absolute right-1 top-1/2 z-10 -translate-y-1/2 text-magnum-700">
	{#if $$slots.default}
		<slot />
	{:else if $open}
		<ChevronUp />
	{:else}
		<ChevronDown />
	{/if}
</div>
