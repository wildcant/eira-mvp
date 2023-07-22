<script lang="ts">
	import { getDialogContext } from './Dialog.svelte';

	const { portal } = getDialogContext();
</script>

<div use:portal>
	<slot />
</div>
