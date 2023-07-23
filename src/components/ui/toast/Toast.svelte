<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Toast } from '@melt-ui/svelte';
	import { AlertCircle } from 'lucide-svelte';
	import { toastVariants } from '.';
	import { getToastContext } from './ToastManager.svelte';
	import type { ToastProps } from './types';

	let className: string | undefined | null = undefined;
	export { className as class };

	export let toast: Toast<ToastProps>;
	const { id, data } = toast;
	const { content, title, description /*, close */ } = getToastContext();
</script>

<div
	melt={$content(id)}
	class={cn(toastVariants({ variant: data.variant }), className)}
	{...$$restProps}
>
	{#if data.variant === 'destructive'}
		<AlertCircle class="h-4 w-4" />
	{/if}
	<h3 melt={$title(id)} class={cn('mb-1 font-medium leading-none tracking-tight')} {...$$restProps}>
		{data.title}
	</h3>
	<div melt={$description(id)} class={cn('text-sm [&_p]:leading-relaxed')} {...$$restProps}>
		{data.description}
	</div>
	<!-- 
		<button
			melt={$close(id)}
			class="inline-flex h-[35px] items-center justify-center rounded-md
          bg-white px-4 font-medium leading-none text-magnum-900 hover:opacity-75"
		>
			Dismiss
		</button>
		<button on:click={data.action}> trigger action </button>
	 -->
</div>
