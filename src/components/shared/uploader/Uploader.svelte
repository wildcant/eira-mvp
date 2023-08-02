<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { ArrowUpFromLine } from 'lucide-svelte';

	export let src: string | undefined = undefined;

	let file: File | undefined;
	let pending = false;
	$: src = file ? URL.createObjectURL(file) : undefined;
</script>

<!-- TODO: Define approach to upload to s3. -->
<form
	class="relative"
	method="POST"
	action="/?/post"
	enctype="multipart/form-data"
	use:enhance={() => {
		pending = true;

		return async ({ result }) => {
			if (result.type === 'redirect') {
				await goto(result.location, {
					replaceState: true
				});
			} else {
				// TODO handle network errors
			}

			pending = false;
			file = undefined;
		};
	}}
>
	{#if src}
		<div class="p-8">
			<div class="flex flex-col bg-white shadow-xl p-2 rounded-md">
				<img class="object-contain h-40" alt="Preview" {src} />
			</div>
		</div>
	{:else}
		<label
			class="border-4 border-dotted rounded-md w-full px-4 py-6 flex flex-col justify-center items-center gap-2"
		>
			<input
				class="hidden"
				type="file"
				name="file"
				accept=".jpg,.jpeg,.png"
				required
				on:change={(e) => {
					file = e.currentTarget.files?.[0];
				}}
			/>
			<ArrowUpFromLine />
			<span class="scroll-m-20 text-base font-semibold tracking-tight"
				>Selecciona o arrastra aquí tus archivos</span
			>
			<small>Hasta 30 MB y 7680 x 4320 píxeles</small>
			<small>(JPEG, JPG, PNG)</small>
		</label>
	{/if}
</form>

<style>
	/* in browsers without JS, the upload button is visible when the file input is populated */
	input[type='file']:valid + svg + button:not(:disabled) {
		display: block;
	}
</style>
