import Root from './components/autocomplete.svelte';
import Button from './components/autocomplete-button.svelte';
import Input from './components/autocomplete-input.svelte';
import Label from './components/autocomplete-label.svelte';
import Option from './components/autocomplete-option.svelte';
import Options from './components/autocomplete-options.svelte';

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
