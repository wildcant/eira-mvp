import type { CreateToggleProps } from '@melt-ui/svelte';
import type { Expand, OmitPressed } from '$lib/components/internal/index.js';
import type { HTMLButtonAttributes } from 'svelte/elements';

type Props = Expand<
	OmitPressed<CreateToggleProps> & {
		pressed?: CreateToggleProps['defaultPressed'];
	}
> &
	HTMLButtonAttributes;

export type {
	Props,
	//
	Props as ToggleProps
};
