<script lang="ts">
	import { Header } from '$components/header';
	import { setInitialClassState } from '$components/header/components/light-switch';
	import * as Drawer from '$lib/components/custom/drawer';
	import { Logo } from '$lib/components/custom/logo';
	import { ModalsManager } from '$lib/components/custom/modal';
	import { ToastManager } from '$lib/components/custom/toast';
	import { buttonVariants } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
	import { ChevronsLeft } from 'lucide-svelte';
	import '../app.css';
	import { Navigation } from '$components/navigation';

	export let data;
	const { isMobile } = data;
	let open = !isMobile;
</script>

<svelte:head>
	{@html `<\u{73}cript nonce="%sveltekit.nonce%">(${setInitialClassState.toString()})();</script>`}
</svelte:head>

<div class="relative">
	<Drawer.Root bind:open>
		<Drawer.Portal>
			<Drawer.Content class="py-9 pl-10 pr-6 bg-background">
				<a
					class="block ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-fit h-fit rounded-lg"
					href="/dashboard"
				>
					<Logo />
				</a>

				<Navigation />

				<Drawer.Close
					class={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'absolute right-2 top-7')}
				>
					<ChevronsLeft />
				</Drawer.Close>
			</Drawer.Content>
		</Drawer.Portal>
	</Drawer.Root>

	<div class={cn('relative transition-all duration-300 my-2', { 'md:ml-52': open })}>
		<div
			class="min-h-[calc(100svh-2rem)] mx-2 md:border md:border-solid md:border-border md:rounded-3xl py-4 px-4"
		>
			<Header bind:drawer={open} />
			<main class="mt-2">
				<slot />
			</main>
		</div>
	</div>
</div>

<ModalsManager />
<ToastManager />
