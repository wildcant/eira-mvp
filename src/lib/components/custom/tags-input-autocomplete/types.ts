import type { Tag } from '@melt-ui/svelte';
import type { CreateTagsInputProps } from '@melt-ui/svelte';
import type { HTMLInputAttributes } from 'svelte/elements';
import type { Writable } from 'svelte/store';

export type CustomTag<TMeta = void> = TMeta extends void ? Tag : Tag & { meta: TMeta };

export type TagsInputAutocompleteProps = Pick<HTMLInputAttributes, 'placeholder' | 'class'> &
	Pick<CreateTagsInputProps, 'defaultTags' | 'disabled'> & {
		allowedTags: CustomTag[];
		tags?: Writable<CustomTag[]>;
		invalid?: boolean;
	};
