<script lang="ts">
	import Select from '$components/ui/select/Select.svelte';
	import SelectContent from '$components/ui/select/SelectContent.svelte';
	import SelectGroup from '$components/ui/select/SelectGroup.svelte';
	import SelectItem from '$components/ui/select/SelectItem.svelte';
	import SelectSeparator from '$components/ui/select/SelectSeparator.svelte';
	import SelectTrigger from '$components/ui/select/SelectTrigger.svelte';
</script>

<h1>Select</h1>
<Select>
	<SelectTrigger class="w-[180px]">Select a fruit</SelectTrigger>
	<SelectContent>
		<SelectGroup label="Fruits">
			<SelectItem value="apple">Apple</SelectItem>
			<SelectItem value="banana">Banana</SelectItem>
			<SelectItem value="blueberry">Blueberry</SelectItem>
			<SelectItem value="grapes">Grapes</SelectItem>
			<SelectItem value="pineapple">Pineapple</SelectItem>
		</SelectGroup>
		<SelectSeparator />
		<SelectGroup label="Vegetables">
			<SelectItem value="asparagus">Asparagus</SelectItem>
			<SelectItem value="broccoli">Broccoli</SelectItem>
			<SelectItem value="carrots">Carrots</SelectItem>
			<SelectItem value="corn">Corn</SelectItem>
			<SelectItem value="garlic">Garlic</SelectItem>
		</SelectGroup>
	</SelectContent>
</Select>
