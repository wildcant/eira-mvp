<script lang="ts">
	import { getTabsContext } from './Tabs.svelte';
	const { list } = getTabsContext();
</script>

<div melt={$list}>
	<slot />
</div>
