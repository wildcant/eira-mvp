<script lang="ts">
	import { t } from '$lib/i18n';
	import { cn } from '$lib/utils';
	import type { Toast } from '@melt-ui/svelte';
	import { AlertCircle, X } from 'lucide-svelte';
	import { toastVariants } from '.';
	import { buttonVariants } from '../button';
	import { getToastContext } from './ToastManager.svelte';
	import type { ToastProps } from './types';

	let className: string | undefined | null = undefined;
	export { className as class };

	export let toast: Toast<ToastProps>;
	const { id, data } = toast;
	const { content, title, description, close } = getToastContext();
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
	<button
		melt={$close(id)}
		class={cn(
			buttonVariants({ variant: 'ghost', size: 'icon' }),
			'absolute right-2 top-2 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground'
		)}
	>
		<X class="h-4 w-4" />
		<span class="sr-only">{$t('common.word.close.capitalize')}</span>
	</button>
	<!-- <button on:click={data.action}> trigger action </button> -->
</div>
