import type {
	HTMLDivAttributes,
	HTMLHeadingAttributes,
	OmitOpen
} from '$lib/components/internal/index.js';
import type { HTMLButtonAttributes } from 'svelte/elements';

import type { CreateDialogProps } from '@melt-ui/svelte';

type Props = Expand<
	OmitOpen<Omit<CreateDialogProps, 'role'>> & {
		open?: CreateDialogProps['defaultOpen'] & {};
	}
>;

type TriggerProps = HTMLButtonAttributes & {
	asChild?: boolean;
};

type CloseProps = TriggerProps;
type ContentProps = HTMLDivAttributes;
type DescriptionProps = HTMLDivAttributes;
type OverlayProps = HTMLDivAttributes;
type PortalProps = HTMLDivAttributes;
type TitleProps = HTMLHeadingAttributes & {
	level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
};

export type {
	Props,
	CloseProps,
	TitleProps,
	PortalProps,
	ContentProps,
	TriggerProps,
	OverlayProps,
	DescriptionProps,
	//
	Props as DrawerProps,
	CloseProps as DrawerCloseProps,
	TitleProps as DrawerTitleProps,
	PortalProps as DrawerPortalProps,
	ContentProps as DrawerContentProps,
	TriggerProps as DrawerTriggerProps,
	OverlayProps as DrawerOverlayProps,
	DescriptionProps as DrawerDescriptionProps
};
