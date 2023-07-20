<script lang="ts">
	import { getTabsContext } from './Tabs.svelte';

	const { content, enumeratePanel } = getTabsContext();
	const index = enumeratePanel();
</script>

<div melt={$content(`tab${index}`)}>
	<slot />
</div>
