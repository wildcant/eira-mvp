<script lang="ts">
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	export let href: HTMLAnchorAttributes['href'];

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<a {href} on:click class={className}>
	<slot />
</a>
