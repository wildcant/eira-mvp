<script lang="ts">
	import Avatar from '$components/ui/avatar/Avatar.svelte';
	import Popover from '$components/ui/popover/Popover.svelte';
	import PopoverContent from '$components/ui/popover/PopoverContent.svelte';
	import PopoverTrigger from '$components/ui/popover/PopoverTrigger.svelte';
	import { cn } from '$lib/utils';
	import { ChevronLeft } from 'lucide-svelte';

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<header class={cn('w-full flex', className)}>
	<slot />
	<div class="flex justify-between flex-1">
		<button on:click={() => history.back()}>
			<ChevronLeft class={cn('text-neutral-300')} />
		</button>

		<Popover placement="bottom-start">
			<PopoverTrigger>
				<!-- src="https://avatars.githubusercontent.com/u/48843517?v=4"  -->
				<Avatar src="" fallback="WC" />
				<span class="sr-only">Open Profile menu</span>
			</PopoverTrigger>
			<PopoverContent class="dark:text-black">
				<div class="flex flex-col gap-2.5">
					<span>Content</span>
				</div>
			</PopoverContent>
		</Popover>
	</div>
</header>
