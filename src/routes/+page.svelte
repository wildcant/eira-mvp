<script lang="ts">
	import { openToast } from '$lib/components/custom/toast';

	import { onMount } from 'svelte';
	onMount(() => {
		openToast({
			data: { variant: 'destructive', title: 'Error', description: 'some desc' }
		});
	});
</script>
