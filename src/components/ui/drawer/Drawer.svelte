<script lang="ts">
	import { cn } from '$lib/utils';
	import { ChevronsLeft } from 'lucide-svelte';
	export let open: boolean = false;

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<aside
	class={cn(
		'fixed top-0 left-0 z-20 w-full md:w-52 h-full transition-all duration-500 transform -translate-x-full dark:bg-zinc-950 ',
		{ 'translate-x-0': open }
	)}
>
	<div class={cn('relative', className)}>
		<button
			on:click={() => (open = !open)}
			class={cn(
				'inline-block p-2 duration-500 rounded-full dark:hover:bg-zinc-700 absolute right-2 top-6'
			)}
		>
			<ChevronsLeft />
		</button>

		<slot />
	</div>
</aside>
