<script lang="ts">
	import { cn } from '$lib/utils';
	import { createCheckbox, type CreateCheckboxProps } from '@melt-ui/svelte';
	import { Check, Minus } from 'lucide-svelte';

	export let checked: CreateCheckboxProps['checked'] = 'indeterminate';
	const { root, input, isChecked, isIndeterminate } = createCheckbox({ checked });

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<div class="flex items-center">
	<button
		melt={$root}
		class={cn(
			'peer h-5 w-5 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
			className
		)}
		id="checkbox"
	>
		{#if $isIndeterminate}
			<Minus class="h-4 w-4" />
		{:else if $isChecked}
			<Check class="h-4 w-4" />
		{/if}
		<input melt={$input} />
	</button>
	{#if $$slots.default}
		<label class="pl-[15px] text-[15px] leading-none dark:text-white" for="checkbox">
			<slot />
		</label>
	{/if}
</div>
