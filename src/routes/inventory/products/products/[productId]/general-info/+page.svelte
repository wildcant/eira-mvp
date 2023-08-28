<script lang="ts">
	import { Separator } from '$lib/components/ui/separator';
	import { Image } from 'lucide-svelte';
	import EditButton from '../_components/edit-button.svelte';

	export let data;
</script>

<section>
	<div>
		<h4>Default photo</h4>
		<div class="w-10 h-8">
			{#if data.image}
				<img src={data.image.url} alt="product" />
			{:else}
				<Image class="w-full h-full" />
			{/if}
		</div>
	</div>

	<EditButton />
</section>

<Separator class="my-4" decorative />

<h4>Product Basics</h4>

<section>
	<div>
		<h5>Product name</h5>
		<span class="font-extralight">{data.name}</span>
	</div>
	<EditButton />
</section>

<Separator class="my-4" decorative subtle />

<section>
	<div>
		<h5>Product description</h5>
		<p class="font-extralight">{data.description ?? ''}</p>
	</div>
	<EditButton />
</section>

<Separator class="my-4" decorative subtle />

<section>
	<div>
		<h5>Product category</h5>
		<p class="font-extralight">Department: {data.department.name ?? ''}</p>
		<p class="font-extralight">Category: {data.category.name ?? ''}</p>
		<p class="font-extralight">Subcategory: {data.subCategory?.name ?? ''}</p>
	</div>
	<EditButton />
</section>

<style lang="postcss">
	section {
		@apply flex w-full justify-between my-4;
	}
</style>
