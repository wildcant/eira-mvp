<script lang="ts">
	import Button from '$components/ui/button/Button.svelte';
	import Dialog from '$components/ui/dialog/Dialog.svelte';
	import DialogContent from '$components/ui/dialog/DialogContent.svelte';
	import DialogDescription from '$components/ui/dialog/DialogDescription.svelte';
	import DialogFooter from '$components/ui/dialog/DialogFooter.svelte';
	import DialogHeader from '$components/ui/dialog/DialogHeader.svelte';
	import DialogTitle from '$components/ui/dialog/DialogTitle.svelte';
	import Input from '$components/ui/input/Input.svelte';
	let modal: Dialog;
</script>

<h1>Modal</h1>
<Button on:click={modal.open}>Edit Profile</Button>

<Dialog bind:this={modal}>
	<DialogContent class="sm:max-w-[425px]">
		<DialogHeader>
			<DialogTitle>Edit profile</DialogTitle>
			<DialogDescription>
				Make changes to your profile here. Click save when you're done.
			</DialogDescription>
		</DialogHeader>
		<div class="grid gap-4 py-4">
			<div class="grid grid-cols-4 items-center gap-4">
				<Input id="name" value="Pedro Duarte" class="col-span-3" />
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<!-- <Label class="text-right">Username</Label> -->
				<Input id="username" value="@peduarte" class="col-span-3" />
			</div>
		</div>
		<DialogFooter>
			<Button type="submit">Save changes</Button>
		</DialogFooter>
	</DialogContent>
</Dialog>
