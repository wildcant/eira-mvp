<script lang="ts">
	import Header from '$components/shared/header/Header.svelte';
	import { setInitialClassState } from '$components/shared/header/components/light-switch/light-switch';
	import ModalsManager from '$components/shared/modal/ModalsManager.svelte';
	import Navigation from '$components/shared/navigation/Navigation.svelte';
	import Drawer from '$components/ui/drawer/Drawer.svelte';
	import Logo from '$components/ui/logo/Logo.svelte';
	import ToastManager from '$components/ui/toast/ToastManager.svelte';
	import { cn } from '$lib/utils';
	import '../app.css';

	export let data;
	const { isMobile } = data;
	let open = !isMobile;
	const closeDrawer = () => (open = false);
</script>

<svelte:head>
	{@html `<\u{73}cript nonce="%sveltekit.nonce%">(${setInitialClassState.toString()})();</script>`}
</svelte:head>

<div class="min-h-[766px] h-[100vh] relative">
	<Drawer bind:open class="h-full py-9 px-8">
		<a
			class="block ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-fit h-fit rounded-lg"
			href="/dashboard"
		>
			<Logo />
		</a>
		<Navigation on:navigate={() => (isMobile ? closeDrawer() : {})} />
	</Drawer>

	<section class={cn('relative transition-all duration-500 my-2', { 'md:ml-52': open })}>
		<div
			class="min-h-[766px] mx-2 md:border md:border-solid md:dark:border-zinc-800 md:rounded-3xl py-4 px-4"
		>
			<Header class="mb-2" bind:drawer={open} />
			<main>
				<slot />
			</main>
		</div>
	</section>
</div>

<ModalsManager />
<ToastManager />
