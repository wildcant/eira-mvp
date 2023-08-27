import type { HTMLDivAttributes, OmitValue } from '$lib/components/internal/index.js';
import type { HTMLInputAttributes, HTMLLiAttributes } from 'svelte/elements';

import type { CreateComboboxProps } from '@melt-ui/svelte';

type Props<T> = Expand<
	OmitValue<Omit<CreateComboboxProps<T>, 'filterFunction'>> & {
		value?: CreateComboboxProps<T>['defaultValue'] & {};
	}
>;

type InputProps = HTMLInputAttributes;
type LabelProps = HTMLDivAttributes;
type MenuProps = HTMLUListElement;
type ItemProps = HTMLLiAttributes;

export type {
	Props,
	ItemProps,
	InputProps,
	MenuProps,
	LabelProps,
	//
	Props as DialogProps,
	ItemProps as DialogItemProps,
	InputProps as DialogInputProps,
	MenuProps as DialogMenuProps,
	LabelProps as DialogLabelProps
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type Meta = Record<string, string | number | boolean | unknown> & { disabled?: boolean };
export type MetaDefault = Record<string, string | number | boolean | unknown>;
export type Item<T extends string | number = string, TMeta extends Meta = MetaDefault> = {
	value: T;
	label: string;
	meta?: TMeta;
};
