<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import JsBarcode from 'jsbarcode';
	import BarcodeScanner from './BarcodeScanner.svelte';

	let ean13: SVGElement;
	let barcode = '';

	let open = false;
</script>

<h1>Barcode reader</h1>
<br />

{#if open}
	<BarcodeScanner bind:barcode on:change={() => JsBarcode(ean13, barcode, { format: 'ean13' })} />
	<Button on:click={() => (open = false)}>Close</Button>
{:else}
	<Button on:click={() => (open = true)}>Read barcode</Button>
{/if}

<br />

<label>
	Resultado
	<input bind:value={barcode} disabled id="result" />
</label>

<button on:click={() => (barcode = '')}>Clear</button>

<svg bind:this={ean13} />
