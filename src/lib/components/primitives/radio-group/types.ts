import type { Expand, HTMLDivAttributes, OmitValue } from '$lib/components/internal/index.js';
import type { CreateRadioGroupProps, RadioGroupItemProps } from '@melt-ui/svelte';
import type { HTMLInputAttributes } from 'svelte/elements';

type Props = Expand<
	OmitValue<CreateRadioGroupProps> & {
		value?: CreateRadioGroupProps['defaultValue'];
	}
> &
	HTMLDivAttributes;

type InputProps = HTMLInputAttributes;

type ItemProps = Expand<RadioGroupItemProps> & HTMLButtonElement;

export type {
	Props,
	InputProps,
	ItemProps,
	//
	Props as RadioGroupProps,
	InputProps as RadioGroupInputProps,
	ItemProps as RadioGroupItemProps
};
