<script lang="ts">
	import { badgeVariants } from '$lib/components/ui/badge';
	import { cn } from '$lib/utils';
	import { createTagsInput, melt, type CreateTagsInputProps } from '@melt-ui/svelte';
	import { X } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';

	type $$Props = Pick<HTMLInputAttributes, 'placeholder' | 'class'> &
		Pick<CreateTagsInputProps, 'defaultTags'> & {
			invalid?: boolean;
		};

	export let placeholder: $$Props['placeholder'] = undefined;
	export let defaultTags: $$Props['defaultTags'] = [];
	export let invalid: $$Props['invalid'] = false;
	let className: $$Props['class'] = undefined;
	export { className as class };

	const dispatch = createEventDispatcher();

	const {
		elements: { root, input, tag, deleteTrigger, edit },
		states: { tags: localTags }
	} = createTagsInput({
		defaultTags,
		unique: true,
		onTagsChange: ({ next }) => {
			dispatch('change', next);
			return next;
		}
	});
</script>

<div
	use:melt={$root}
	class={cn(
		'flex flex-row flex-wrap gap-2.5 rounded-md bg-transparent px-3 py-2 border border-input ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
		{ 'border-red-500': invalid },
		className
	)}
>
	{#each $localTags as t}
		<div
			use:melt={$tag(t)}
			class={cn(
				badgeVariants({ variant: 'outline' }),
				'ring-offset-background data-[selected]:ring-2 ring-ring'
			)}
		>
			{t.value}
			<button
				use:melt={$deleteTrigger(t)}
				class="flex h-full items-center px-1 enabled:hover:bg-accent enabled:hover:text-accent-foreground rounded-full"
			>
				<X class="square-3" />
			</button>
		</div>
		<div
			use:melt={$edit(t)}
			class="flex items-center overflow-hidden rounded-md px-1.5 [word-break:break-word] data-[invalid-edit]:focus:!ring-red-500"
		/>
	{/each}

	<input
		use:melt={$input}
		type="text"
		{placeholder}
		class="shrink grow basis-0 min-w-[3rem] border-0 outline-none focus:!ring-0 bg-transparent placeholder:text-muted-foreground text-sm data-[invalid]:text-red-500"
	/>
</div>
