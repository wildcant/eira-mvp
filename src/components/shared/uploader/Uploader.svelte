<script lang="ts">
	import { ArrowUpFromLine } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import type { ChangeEventHandler } from 'svelte/elements';

	export let imageId: string | undefined = undefined;
	let src: string | undefined = undefined;

	const dispatch = createEventDispatcher();

	let pending = false;
	let file: File | undefined;
	// TODO: Display quick preview and handle upload error.
	// $: src = file ? URL.createObjectURL(file) : undefined;

	const uploadImage: ChangeEventHandler<HTMLInputElement> = async (e) => {
		pending = true;
		file = e.currentTarget.files?.[0];
		if (!file) return;

		const formData = new FormData();
		formData.append('file', file);
		const response = await fetch('/api/images/upload', {
			method: 'post',
			body: formData
		});

		// TODO: Add types.
		const data = await response.json();
		src = data.url;
		imageId = data.imageId;
		dispatch('change', data);
		pending = false;
	};
</script>

<div class="relative">
	{#if pending}
		<div>
			<p>Loading..</p>
		</div>
	{:else if src}
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
				on:change={uploadImage}
			/>
			<ArrowUpFromLine />
			<span class="scroll-m-20 text-base font-semibold tracking-tight">
				Selecciona o arrastra aquí tus archivos
			</span>
			<small>Hasta 30 MB y 7680 x 4320 píxeles</small>
			<small>(JPEG, JPG, PNG)</small>
		</label>
	{/if}
</div>
