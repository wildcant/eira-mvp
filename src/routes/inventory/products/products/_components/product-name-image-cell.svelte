<script lang="ts">
	import type { Product } from '$lib/api/types';
	import { ImageCell } from '$lib/components/ui/table';
	import type { DataBodyRow } from 'svelte-headless-table';

	export let row: DataBodyRow<Product>;
	const { id, name, image } = row.original;
</script>

<a href={`/inventory/products/products/${id}`}>
	<div class="flex items-center hover:cursor-pointer group">
		<ImageCell src={image?.url} />
		<span class="font-semibold text-base group-hover:underline">{name}</span>
	</div>
</a>
