<script lang="ts" context="module">
	export const NEW_DEPARTMENT_MODAL_ID = 'new-department';
</script>

<script lang="ts">
	import Button from '$components/ui/button/Button.svelte';
	import DialogFooter from '$components/ui/dialog/DialogFooter.svelte';
	import Input from '$components/ui/input/Input.svelte';
	import Label from '$components/ui/label/Label.svelte';
</script>

<div class="grid gap-4 py-4">
	<div class="grid grid-cols-4 items-center gap-4">
		<Label class="col-span-3">
			Name
			<Input id="name" value="Pedro Duarte" />
		</Label>
	</div>
	<div class="grid grid-cols-4 items-center gap-4">
		<Label class="col-span-3">
			Color
			<Input id="username" value="@peduarte" />
		</Label>
	</div>
</div>

<DialogFooter>
	<Button type="submit">Save</Button>
</DialogFooter>
