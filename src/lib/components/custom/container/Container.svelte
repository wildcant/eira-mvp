<script lang="ts">
	import { cn } from '$lib/utils';

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<section class={cn('border border-solid border-border rounded-3xl py-4 px-4', className)}>
	<slot />
</section>
