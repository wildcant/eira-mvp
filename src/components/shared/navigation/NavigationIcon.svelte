<script lang="ts">
	import { Box, LayoutDashboard, LayoutList, Shapes, Store, Warehouse } from 'lucide-svelte';
	import type { NavigationIconName } from '.';

	export let name: NavigationIconName;
</script>

{#if name === 'layout-dashboard'}
	<LayoutDashboard />
{:else if name === 'warehouse'}
	<Warehouse />
{:else if name === 'box'}
	<Box />
{:else if name === 'shapes'}
	<Shapes />
{:else if name === 'store'}
	<Store />
{:else if name === 'layout-list'}
	<LayoutList />
{/if}
