import Root from './components/Autocomplete.svelte';
import Button from './components/AutocompleteButton.svelte';
import Input from './components/AutocompleteInput.svelte';
import Label from './components/AutocompleteLabel.svelte';
import Option from './components/AutocompleteOption.svelte';
import Options from './components/AutocompleteOptions.svelte';

export {
	Root,
	Button,
	Input,
	Label,
	Option,
	Options,
	//
	Root as Autocomplete,
	Button as AutocompleteButton,
	Input as AutocompleteInput,
	Label as AutocompleteLabel,
	Option as AutocompleteOption,
	Options as AutocompleteOptions
};

export * from './types';
