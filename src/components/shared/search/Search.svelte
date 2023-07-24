<script lang="ts">
	import Button from '$components/ui/button/Button.svelte';
	import { t } from '$lib/i18n';
	import { cn } from '$lib/utils';
	import { createLabel } from '@melt-ui/svelte';
	import { Search, XCircle } from 'lucide-svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';

	let className: string | undefined | null = undefined;
	export { className as class };

	export let value: HTMLInputAttributes['value'] = undefined;
	export let placeholder: HTMLInputAttributes['placeholder'] = undefined;

	const root = createLabel();
</script>

<form on:reset>
	<label use:root class="text-sm w-56 relative isolate h-8 flex items-center">
		<Search class="text-[#9F9FA9] absolute left-2 pointer-events-none h-4 w-4" />

		<input
			class={cn(
				'peer w-full focus:outline-none placeholder:text-muted-foreground px-8 py-2 text-xs border border-input bg-transparent ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md',
				className
			)}
			type="text"
			id="search"
			placeholder={placeholder ?? `${$t('component.search.placeholder')}..`}
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
			autocomplete="off"
		/>

		<Button
			variant="ghost"
			size="icon"
			class="!p-0 peer-placeholder-shown:hidden absolute right-2"
			type="reset"
		>
			<XCircle class="w-4 h-4" />
		</Button>
	</label>
</form>
