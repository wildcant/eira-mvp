<script lang="ts">
	import type { Option } from '$components/ui/autocomplete/Autocomplete.svelte';
	import Autocomplete from '$components/ui/autocomplete/Autocomplete.svelte';
	import AutocompleteButton from '$components/ui/autocomplete/AutocompleteButton.svelte';
	import AutocompleteInput from '$components/ui/autocomplete/AutocompleteInput.svelte';
	import AutocompleteLabel from '$components/ui/autocomplete/AutocompleteLabel.svelte';
	import AutocompleteOption from '$components/ui/autocomplete/AutocompleteOption.svelte';
	import AutocompleteOptions from '$components/ui/autocomplete/AutocompleteOptions.svelte';

	type Opt = Option<string, { author: string; disabled: boolean }>;
	const options: Opt[] = [
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

	let selectedItem: Opt | undefined = undefined;

	const handleSubmit = (e: SubmitEvent) => {
		e.preventDefault();
		const data = new FormData(e.target as HTMLFormElement);
		console.log([...data.entries()]);
	};
</script>

<h1>Autocomplete</h1>
<form on:submit={handleSubmit}>
	<Autocomplete {options} bind:selectedItem>
		<AutocompleteLabel>
			<AutocompleteInput name="sample" />
			<AutocompleteButton />
		</AutocompleteLabel>

		<AutocompleteOptions let:filteredOptions>
			{#each filteredOptions as option, index (index)}
				<AutocompleteOption {index} {option}>{option.label}</AutocompleteOption>
			{/each}
		</AutocompleteOptions>
	</Autocomplete>
	<button>Submit</button>
</form>
<br />

<button on:click={() => (selectedItem = options[0])}>select option</button>
<button on:click={() => (selectedItem = undefined)}>clear</button>
