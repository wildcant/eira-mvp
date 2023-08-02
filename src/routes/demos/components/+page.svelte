<script lang="ts">
	import Modal from './Modal.svelte';
	import Select from './Select.svelte';
	import Tabs from './Tabs.svelte';
	import Autocomplete from './Autocomplete.svelte';
	import Uploader from '$components/shared/uploader/Uploader.svelte';
	let src: '';
</script>

<Uploader {src} />

<br />

<Modal />

<br />

<Select />

<br />

<Tabs />

<br />

<Autocomplete />
