<script lang="ts">
	import { createSwitch } from '@melt-ui/svelte';

	const { root } = createSwitch();

	export let label: string | undefined = undefined;
</script>

<!-- TODO: Allow form mode (use checkbox input). -->
<button
	melt={$root}
	type="button"
	class="group inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
>
	<span class="hidden sr-only" aria-hidden="true">{label}</span>
	<span
		class="pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform translate-x-0 group-aria-checked:translate-x-5"
	/>
</button>

<!-- 
<form>
	<div class="flex items-center">
		<label class="pr-4 leading-none text-black" for="theme-mode"> Airplane mode </label>
		<button
			melt={$root}
			class="relative h-6 w-11 cursor-default rounded-full bg-zinc-200 transition-colors data-[state=checked]:bg-zinc-950"
			id="theme-mode"
		>
			<span
				class="block h-5 w-5 translate-x-0.5 rounded-full bg-zinc-800
                transition-transform will-change-transform
                {$isChecked && 'translate-x-[22px]'}"
			/>
			<input melt={$input} />
		</button>
	</div>
</form>
 -->

<!-- 
<button
	bind:this={button}
	melt={$root}
	type="button"
	role="switch"
	aria-checked={checked}
	data-state={getState(checked)}
	data-disabled={disabled ? '' : undefined}
	{value}
	{disabled}
	{...$$restProps}
	use:useActions={$$restProps.use}
	on:click={() => {
		checked = !checked;
	}}
>
	<slot />
</button>

{#if isFormControl}
	<input
		type="checkbox"
		melt={$input}
		aria-hidden="true"
		hidden
		tabIndex={-1}
		name={$$props.name}
		{value}
		{checked}
		{required}
		{disabled}
		style="
        position: absolute;
        pointer-events: none;
        opacity: 0;
        margin: 0;
        transform: translateX(-100%);
    "
	/>
{/if}

 -->

<!-- 
<style>
	button[role='switch'] {
		display: block;
		margin: 2px;
		padding: 4px 4px 8px 8px;
		border: 0 solid #005a9c;
		border-radius: 5px;
		width: 17em;
		height: 3em;
		text-align: left;
		background-color: white;
		color: black;
	}

	button[role='switch'] .label {
		position: relative;
		top: -3px;
		display: inline-block;
		padding: 0;
		margin: 0;
		width: 10em;
		vertical-align: middle;
		color: black;
	}

	button[role='switch'] svg {
		display: inline-block;
		width: 36px;
		height: 20px;
		forced-color-adjust: auto;
		position: relative;
		top: 4px;
	}

	button[role='switch'] svg rect {
		fill-opacity: 0;
		stroke-width: 2;
		stroke: currentcolor;
	}

	button[role='switch'] svg rect.off {
		display: block;
		stroke: currentcolor;
		fill: currentcolor;
		fill-opacity: 1;
	}

	button[role='switch'][aria-checked='true'] svg rect.off {
		display: none;
	}

	button[role='switch'] svg rect.on {
		display: none;
	}

	button[role='switch'][aria-checked='true'] svg rect.on {
		color: green;
		display: block;
		stroke-color: currentcolor;
		fill: currentcolor;
		fill-opacity: 1;
	}

	button[role='switch'] span.off {
		display: inline-block;
	}

	button[role='switch'] span.on {
		display: none;
	}

	button[role='switch'][aria-checked='true'] span.off {
		display: none;
	}

	button[role='switch'][aria-checked='true'] span.on {
		display: inline-block;
	}

	button[role='switch']:focus,
	button[role='switch']:hover {
		padding: 2px 2px 6px 6px;
		border-width: 2px;
		outline: none;
		background-color: #def;
		cursor: pointer;
	}
</style>
 -->
