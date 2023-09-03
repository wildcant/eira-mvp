import type { OmitOpen, Expand, HTMLDivAttributes } from '$lib/components/internal/index.js';
import type { CreateHoverCardProps } from '@melt-ui/svelte';
import type { HTMLAnchorAttributes } from 'svelte/elements';

type Props = Expand<
	OmitOpen<CreateHoverCardProps> & {
		open?: CreateHoverCardProps['defaultOpen'];
	}
>;
type TriggerProps = HTMLAnchorAttributes;
type ContentProps = HTMLDivAttributes;

export type {
	Props,
	TriggerProps,
	ContentProps,
	//
	Props as HoverCardProps,
	TriggerProps as HoverCardTriggerProps,
	ContentProps as HoverCardContentProps
};
