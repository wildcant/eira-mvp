<script lang="ts">
	import { cn } from '$lib/utils';
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';

	let video: HTMLVideoElement;
	export let barcode: string | undefined = undefined;

	const dispatch = createEventDispatcher();
	let stream: MediaStream;
	onMount(() => {
		async function record() {
			// Get user camera permission
			stream = await navigator.mediaDevices.getUserMedia({
				video: { facingMode: { ideal: 'environment' } },
				audio: false
			});
			video.srcObject = stream;
			await video.play();

			const barcodeDetector = new BarcodeDetector({ formats: ['ean_13'] });

			setInterval(async () => {
				const barcodes = await barcodeDetector.detect(video);
				if (barcodes.length <= 0) return;

				const barCode = barcodes[0].rawValue;
				barcode = barCode;
				dispatch('change');
			}, 1000);
		}
		if (!('BarcodeDetector' in window)) {
			console.log('Barcode Detector is not supported by this browser.');
		} else {
			record();
		}
	});

	onDestroy(() => {
		const tracks = stream.getTracks();
		tracks.forEach((track) => track.stop());
		video.srcObject = null; // Clear the video source
	});
</script>

<div>
	<div
		class={cn(
			`fixed right-[10px] bottom-[10px] z-50 max-h-[85vh] w-[90vw] max-w-[450px] rounded-md p-6 shadow-lg bg-background border gap-4 animate-in sm:max-w-lg sm:rounded-lg sm:zoom-in-90`
		)}
		{...$$restProps}
	>
		<video bind:this={video} id="stream"> <track kind="captions" /></video>
	</div>
</div>
