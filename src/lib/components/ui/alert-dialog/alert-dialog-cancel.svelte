<script lang="ts">
	import { AlertDialog as AlertDialogPrimitive } from '$lib/components/primitives';
	import { buttonVariants } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';

	type $$Props = AlertDialogPrimitive.CancelProps;
	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<AlertDialogPrimitive.Cancel
	class={cn(buttonVariants({ variant: 'outline' }), 'mt-2 sm:mt-0', className)}
	on:m-click
	{...$$restProps}
>
	<slot />
</AlertDialogPrimitive.Cancel>
