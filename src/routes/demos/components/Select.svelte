<script lang="ts">
	import * as Select from '$lib/components/ui/select';
</script>

<h1>Select</h1>
<Select.Root>
	<Select.Trigger class="w-[180px]">Select a fruit</Select.Trigger>
	<Select.Content>
		<Select.Group>
			<Select.Label>Fruits</Select.Label>
			<Select.Item value="apple">Apple</Select.Item>
			<Select.Item value="banana">Banana</Select.Item>
			<Select.Item value="blueberry">Blueberry</Select.Item>
			<Select.Item value="grapes">Grapes</Select.Item>
			<Select.Item value="pineapple">Pineapple</Select.Item>
		</Select.Group>

		<Select.Separator />

		<Select.Group>
			<Select.Label>Vegetables</Select.Label>
			<Select.Item value="asparagus">Asparagus</Select.Item>
			<Select.Item value="broccoli">Broccoli</Select.Item>
			<Select.Item value="carrots">Carrots</Select.Item>
			<Select.Item value="corn">Corn</Select.Item>
			<Select.Item value="garlic">Garlic</Select.Item>
		</Select.Group>
	</Select.Content>
</Select.Root>
