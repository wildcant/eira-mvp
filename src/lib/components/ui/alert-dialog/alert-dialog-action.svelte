<script lang="ts">
	import { AlertDialog as AlertDialogPrimitive } from '$lib/components/primitives';
	import { buttonVariants } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';

	type $$Props = AlertDialogPrimitive.ActionProps;
	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<AlertDialogPrimitive.Action on:m-click class={cn(buttonVariants(), className)} {...$$restProps}>
	<slot />
</AlertDialogPrimitive.Action>
