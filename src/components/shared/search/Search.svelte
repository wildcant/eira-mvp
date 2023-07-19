<script lang="ts">
	import { cn } from '$lib/utils';
	import { Search, XCircle } from 'lucide-svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { createLabel } from '@melt-ui/svelte';
	let className: string | undefined | null = undefined;

	export let value: HTMLInputAttributes['value'] = undefined;
	export { className as class };
	const root = createLabel();
</script>

<label use:root class="text-sm w-56 relative isolate h-10 flex items-center">
	<Search class="text-[#9F9FA9] absolute left-2 pointer-events-none" />

	<input
		class={cn(
			'peer text-white w-full border-none bg-transparent focus:outline-none placeholder:text-neutral-500 px-8',
			className
		)}
		type="text"
		id="search"
		bind:value
		on:blur
		on:change
		on:click
		on:focus
		on:keydown
		on:keypress
		on:keyup
		on:mouseover
		on:mouseenter
		on:mouseleave
		on:paste
		on:input
		{...$$restProps}
	/>

	<div
		class="bg-[#27272A] absolute w-full h-full z-[-1] pointer-events-none shadow-[rgba(0,0,0,0.16)_0px_1px_4px] rounded-sm inset-0 border border-solid border-[#3F3F47] peer-focus-within:border-neutral-100"
	/>

	<button
		class="block peer-placeholder-shown:hidden absolute right-2"
		type="reset"
		on:click={() => (value = '')}
	>
		<XCircle />
	</button>
</label>
