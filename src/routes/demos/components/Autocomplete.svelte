<script lang="ts">
	import type { Item } from '$lib/components/custom/autocomplete';
	import * as Autocomplete from '$lib/components/custom/autocomplete';
	import Button from '$lib/components/ui/button/button.svelte';
	import { writable } from 'svelte/store';

	type Option = Item<string, { author: string; disabled: boolean }>;
	const defaultItems = [
		{
			label: 'To Kill a Mockingbird',
			value: 'to-kill-a-mockingbird',
			meta: {
				author: 'Harper Lee',
				disabled: false
			}
		},
		{
			label: 'War and Peace',
			value: 'war-and-peace',
			meta: {
				author: 'Lev Tolstoy',
				disabled: false
			}
		},
		{
			label: 'The Idiot',
			value: 'the-idiot',
			meta: {
				author: 'Fyodor Dostoyevsy',
				disabled: true
			}
		},
		{
			label: 'A Picture of Dorian Gray',
			value: 'a-picture-of-dorian-gray',
			meta: {
				author: 'Oscar Wilde',
				disabled: false
			}
		},
		{
			label: '1984',
			value: '1984',
			meta: {
				author: 'George Orwell',
				disabled: false
			}
		},
		{
			label: 'Pride and Prejudice',
			value: 'pride-and-prejudice',
			meta: {
				author: 'Jane Austen',
				disabled: false
			}
		},
		{
			label: 'Meditations',
			value: 'meditations',
			meta: {
				author: 'Marcus Aurelius',
				disabled: false
			}
		},
		{
			label: 'The Brothers Karamazov',
			value: 'the-brothers-karamazov',
			meta: {
				author: 'Fyodor Dostoevsky',
				disabled: false
			}
		},
		{
			label: 'Anna Karenina',
			value: 'anna-karenina',
			meta: {
				author: 'Lev Tolstoy',
				disabled: false
			}
		},
		{
			label: 'Crime and Punishment',
			value: 'crime-and-punishment',
			meta: {
				author: 'Fyodor Dostoevsky',
				disabled: false
			}
		}
	];
	const items = writable<Option[]>(defaultItems);

	let value: Option | undefined = undefined;

	const handleSubmit = (e: SubmitEvent) => {
		e.preventDefault();
		const data = new FormData(e.target as HTMLFormElement);
		console.info([...data.entries()]);
	};
</script>

<h1>Autocomplete</h1>
<div class="flex gap-2">
	<Button on:click={() => (value = $items[0])}>select option</Button>
	<Button on:click={() => ($items = defaultItems.slice(1, 4))}>change options</Button>
	<Button on:click={() => ($items = defaultItems)}>reset options</Button>
</div>

<br />

<form on:submit={handleSubmit}>
	<Autocomplete.Root bind:value>
		<Autocomplete.Label>
			<Autocomplete.Input name="sample" />
			<Autocomplete.Button />
		</Autocomplete.Label>

		<Autocomplete.Options>
			{#each $items as option, index (index)}
				<Autocomplete.Option item={option}>{option.label}</Autocomplete.Option>
			{/each}
		</Autocomplete.Options>
	</Autocomplete.Root>
	<Button class="mt-4">Submit</Button>
</form>
<br />
