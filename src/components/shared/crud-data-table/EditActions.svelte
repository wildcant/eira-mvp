<script lang="ts">
	import Button from '$components/ui/button/Button.svelte';
	import FloatingAction from '$components/ui/floating-action/FloatingAction.svelte';
	import Separator from '$components/ui/separator/Separator.svelte';
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
