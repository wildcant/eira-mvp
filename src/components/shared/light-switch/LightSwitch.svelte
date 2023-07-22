<script lang="ts">
	import { cn } from '$lib/utils';
	import { Moon, Sun } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import {
		getModeOsPrefers,
		modeCurrent,
		setModeCurrent,
		setModeUserPrefers
	} from './light-switch';
	import { buttonVariants } from '$components/ui/button/index';

	type OnKeyDownEvent = KeyboardEvent & {
		currentTarget: EventTarget & HTMLDivElement;
	};

	function onToggleHandler(): void {
		$modeCurrent = !$modeCurrent;
		setModeUserPrefers($modeCurrent);
		setModeCurrent($modeCurrent);
	}

	// A11y Input Handlers
	function onKeyDown(event: OnKeyDownEvent): void {
		// Enter/Space triggers selection event
		if (['Enter', 'Space'].includes(event.code)) {
			event.preventDefault();
			event.currentTarget.click();
		}
	}

	let mounted = false;
	// Lifecycle
	onMount(() => {
		// Sync lightswitch with the theme
		if (!('modeCurrent' in localStorage)) {
			setModeCurrent(getModeOsPrefers());
		}
		mounted = true;
	});
</script>

<button
	on:click={onToggleHandler}
	on:click
	on:keydown={onKeyDown}
	on:keydown
	on:keyup
	on:keypress
	role="switch"
	aria-label="Light Switch"
	aria-checked={!$modeCurrent}
	title="Toggle {!$modeCurrent === true ? 'Dark' : 'Light'} Mode"
	tabindex="0"
	on:click={onToggleHandler}
	type="button"
	id="light-switch"
	class={cn(buttonVariants({ variant: 'ghost' }), 'group', { block: mounted })}
>
	<span class="inline-block text-sm text-foreground" aria-hidden="true">Appearance</span>
	<span
		class="inline-block h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 transition-all group-disabled:cursor-not-allowed group-disabled:opacity-50 border-muted group-hover:border-border"
	>
		<span
			class="pointer-events-none h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-all translate-x-0 group-aria-checked:translate-x-4 flex justify-center items-center group-aria-checked:bg-black"
		>
			<Sun class="h-3 w-3 block group-aria-checked:hidden" aria-hidden="true" />
			<Moon class="h-3 w-3 hidden group-aria-checked:block text-white" aria-hidden="true" />
		</span>
	</span>
</button>
