<script lang="ts">
	import { cn } from '$lib/utils';
	import { createProgress, type CreateProgressProps } from '@melt-ui/svelte';

	let className: string | undefined | null = undefined;
	export { className as class };
	let valueProp: CreateProgressProps['value'] = undefined;
	export { valueProp as value };
	let maxProp: CreateProgressProps['max'] = 100;
	export { maxProp as max };

	const { progress, value, max } = createProgress({
		value: valueProp,
		max: maxProp
	});

	const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
	sleep(1000).then(() => {
		value.set(75);
	});
</script>

<div
	melt={$progress}
	class={cn('relative h-4 w-full overflow-hidden rounded-full bg-secondary', className)}
	{...$$restProps}
>
	<div
		class="h-full w-full flex-1 bg-primary transition-all"
		style={`transform: translateX(-${100 - (100 * ($value ?? 0)) / ($max ?? 1)}%)`}
	/>
</div>
