<script lang="ts" context="module">
	import { createToaster, melt } from '@melt-ui/svelte';

	const {
		elements: { content, title, description, close },
		helpers: { addToast: addToastLocal },
		states: { toasts },
		actions: { portal }
	} = createToaster<ToastProps>();

	export const addToast = addToastLocal;
</script>

<script lang="ts">
	import { alertVariants } from '$lib/components/ui/alert';
	import { buttonVariants } from '$lib/components/ui/button';
	import { t } from '$lib/i18n';
	import { cn } from '$lib/utils';
	import { AlertCircle, X } from 'lucide-svelte';
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';
	import type { ToastProps } from './types';

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<div class="fixed bottom-0 right-0 z-[60] m-4 flex flex-col items-end gap-2" use:portal>
	{#each $toasts as { id, data } (id)}
		<div
			use:melt={$content(id)}
			animate:flip={{ duration: 500 }}
			in:fly={{ duration: 150, x: '100%' }}
			out:fly={{ duration: 150, x: '100%' }}
		>
			<div class={cn(alertVariants({ variant: data.variant }), 'min-w-[12rem]', className)}>
				{#if data.variant === 'destructive'}
					<AlertCircle class="h-4 w-4" />
				{/if}

				<h3 use:melt={$title(id)} class="mb-1 font-medium leading-none tracking-tight">
					{data.title}
				</h3>
				<p use:melt={$description(id)} class="text-sm [&_p]:leading-relaxed">
					{data.description}
				</p>

				<button
					use:melt={$close(id)}
					class={cn(
						buttonVariants({ variant: 'ghost', size: 'icon' }),
						'absolute right-2 top-2 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground'
					)}
				>
					<X class="h-4 w-4" />
					<span class="sr-only">{$t('common.word.close.capitalize')}</span>
				</button>
			</div>
		</div>
	{/each}
</div>
