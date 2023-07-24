<script lang="ts">
	import Avatar from '$components/ui/avatar/Avatar.svelte';
	import Button from '$components/ui/button/Button.svelte';
	import Popover from '$components/ui/popover/Popover.svelte';
	import PopoverContent from '$components/ui/popover/PopoverContent.svelte';
	import PopoverTrigger from '$components/ui/popover/PopoverTrigger.svelte';
	import { t } from '$lib/i18n';
	import { cn } from '$lib/utils';
	import { ChevronLeft, Menu } from 'lucide-svelte';
	import LanguageSelector from './components/language-selector/LanguageSelector.svelte';
	import LightSwitch from './components/light-switch/LightSwitch.svelte';

	export let drawer: boolean;
	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<header class={cn('w-full flex', className)}>
	<div class="flex justify-between items-center w-full">
		<div>
			<Button
				variant="ghost"
				size="icon"
				class={cn('transition-all duration-500', { hidden: drawer })}
				on:click={() => (drawer = true)}
			>
				<Menu />
			</Button>
			<Button variant="ghost" size="icon" on:click={() => history.back()}>
				<ChevronLeft />
			</Button>
		</div>

		<div class="flex gap-2">
			<LanguageSelector />
			<Popover placement="bottom-start">
				<PopoverTrigger class="w-fit h-fit p-0 m-0">
					<!-- src="https://avatars.githubusercontent.com/u/48843517?v=4"  -->
					<Avatar src="" fallback="WC" />
					<span class="sr-only">{$t('component.header.avatar.sr-only')}</span>
				</PopoverTrigger>
				<PopoverContent class="p-2">
					<div class="flex flex-col gap-2.5">
						<LightSwitch />
					</div>
				</PopoverContent>
			</Popover>
		</div>
	</div>
</header>
