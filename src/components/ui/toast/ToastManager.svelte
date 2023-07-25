<script lang="ts" context="module">
	import { uniqueContext } from '$lib/helpers/uniqueContext';

	type ToastContextProps = Omit<
		ReturnType<typeof createToasts<ToastProps>>,
		'toasts' | 'options' | 'addToast'
	>;
	export const { getContext: getToastContext, setContext: setToastContext } =
		uniqueContext<ToastContextProps>();

	const { toasts, addToast, content, title, description, close } = createToasts<ToastProps>({});
	export const openToast = addToast;
</script>

<script lang="ts">
	import { createToasts } from '@melt-ui/svelte';
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';
	import Toast from './Toast.svelte';
	import type { ToastProps } from './types';

	setToastContext({ content, title, description, close });
</script>

<div class="fixed bottom-0 right-0 z-50 m-4 flex flex-col items-end gap-2">
	{#each $toasts as toast (toast.id)}
		<div
			animate:flip={{ duration: 500 }}
			in:fly={{ duration: 150, x: '100%' }}
			out:fly={{ duration: 150, x: '100%' }}
		>
			<Toast {toast} />
		</div>
	{/each}
</div>
