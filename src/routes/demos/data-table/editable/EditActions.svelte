<script lang="ts">
	import { FloatingAction } from '$lib/components/custom/floating-action';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { createEventDispatcher } from 'svelte';

	export let loading: boolean;
	export let dirty: boolean;
	const dispatch = createEventDispatcher();
</script>

<FloatingAction>
	<Button
		variant="link"
		class="text-background"
		disabled={loading}
		on:click={() => dispatch('cancel')}
	>
		Cancel
	</Button>

	<Separator class="h-4	bg-zinc-800" orientation="vertical" />

	<Button
		variant="link"
		class="text-background"
		disabled={loading || !dirty}
		{loading}
		on:click={() => dispatch('update')}
	>
		Save
	</Button>
</FloatingAction>
