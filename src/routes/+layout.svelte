<script lang="ts">
	import Header from '$components/shared/header/Header.svelte';
	import Navigation from '$components/shared/navigation/Navigation.svelte';
	import Drawer from '$components/ui/drawer/Drawer.svelte';
	import Logo from '$components/ui/logo/Logo.svelte';
	import { cn } from '$lib/utils';
	import { Menu } from 'lucide-svelte';
	import '../app.css';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	const { isMobile } = data;
	let open = !isMobile;
	const closeDrawer = () => (open = false);
</script>

<div class="min-h-[766px] h-[100vh]">
	<Drawer bind:open class=" h-full py-8 px-10">
		<a href="/dashboard">
			<Logo />
		</a>
		<Navigation on:navigate={() => (isMobile ? closeDrawer() : {})} />
	</Drawer>

	<section class={cn('transition-all duration-500 my-2', { 'md:ml-52': open })}>
		<div
			class="min-h-[766px] mx-2 md:border md:border-solid md:dark:border-zinc-800 md:rounded-3xl py-4 px-4"
		>
			<Header class="mb-2">
				<button
					class={cn('p-2 transition-all duration-500 rounded-full dark:hover:bg-zinc-700', {
						hidden: open
					})}
					on:click={() => (open = true)}
				>
					<Menu />
				</button>
			</Header>

			<main>
				<slot />
			</main>
		</div>
	</section>
</div>
