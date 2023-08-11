<script>
	import Portal from '../portal/portal.svelte';
</script>

<Portal>
	<div class="fixed bottom-10 z-50 ml-[50%]" style="transform: translate(-50%);">
		<div
			class="bg-dual px-5 py-2 rounded-full flex justify-center items-center shadow-fab shadow-dual"
		>
			<slot />
		</div>
	</div>
</Portal>
