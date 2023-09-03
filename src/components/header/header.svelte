<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';
	import * as Popover from '$lib/components/ui/popover';
	import { t } from '$lib/i18n';
	import { cn } from '$lib/utils';
	import { ChevronLeft, Menu } from 'lucide-svelte';
	import { LanguageSelector } from './components/language-selector';
	import { LightSwitch } from './components/light-switch';

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
			<Popover.Root positioning={{ placement: 'bottom-start' }}>
				<Popover.Trigger class="w-fit h-fit p-0 m-0">
					<!-- src="https://avatars.githubusercontent.com/u/48843517?v=4"  -->
					<Avatar.Root>
						<Avatar.Image src="" alt="profile image" />
						<Avatar.Fallback>WC</Avatar.Fallback>
					</Avatar.Root>

					<span class="sr-only">{$t('component.header.avatar.sr-only')}</span>
				</Popover.Trigger>
				<Popover.Content class="p-2">
					<div class="flex flex-col gap-2.5">
						<LightSwitch />
					</div>
				</Popover.Content>
			</Popover.Root>
		</div>
	</div>
</header>
