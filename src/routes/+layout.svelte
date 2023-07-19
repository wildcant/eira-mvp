<script lang="ts">
	import '../app.css';
	import Avatar from '$components/avatar/Avatar.svelte';
	import Button from '$components/button/Button.svelte';
	import Checkbox from '$components/checkbox/Checkbox.svelte';
	import Logo from '$components/logo/Logo.svelte';
	import Navigation from '$components/navigation/Navigation.svelte';
	import Popover from '$components/popover/Popover.svelte';
	import PopoverContent from '$components/popover/PopoverContent.svelte';
	import PopoverTrigger from '$components/popover/PopoverTrigger.svelte';
</script>

<main class="dark:bg-gray-950 dark:text-white flex flex-col gap-10">
	<Logo />

	<Navigation />

	<div>
		<Button>Label</Button>
	</div>

	<Checkbox>Label</Checkbox>

	<Popover placement="bottom">
		<PopoverTrigger>
			<Avatar src="https://avatars.githubusercontent.com/u/48843517?v=4" fallback="WC" />
			<span class="sr-only">Open Profile menu</span>
		</PopoverTrigger>
		<PopoverContent class="dark:text-black">
			<div class="flex flex-col gap-2.5">
				<span>Content</span>
			</div>
		</PopoverContent>
	</Popover>

	<slot />
</main>
