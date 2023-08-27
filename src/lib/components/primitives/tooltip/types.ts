import type {
	Expand,
	HTMLDivAttributes,
	OmitOpen,
	Transition,
	OnChangeFn,
	AsChild,
	TransitionProps,
	CustomEventHandler
} from '$lib/components/internal';
import type { CreateTooltipProps } from '@melt-ui/svelte';
import type { HTMLButtonAttributes } from 'svelte/elements';

type Props = Expand<
	OmitOpen<CreateTooltipProps> & {
		open?: CreateTooltipProps['defaultOpen'] & {};
		onOpenChange?: OnChangeFn<CreateTooltipProps['defaultOpen']>;
	}
>;

type ContentProps<
	T extends Transition = Transition,
	In extends Transition = Transition,
	Out extends Transition = Transition
> = Expand<
	{
		sideOffset?: number;
	} & TransitionProps<T, In, Out> &
		AsChild
> &
	HTMLDivAttributes;

type TriggerProps = AsChild & HTMLButtonAttributes;
type ArrowProps = Expand<
	{
		size?: number;
	} & AsChild
> &
	HTMLDivAttributes;

type TriggerEvents<T extends Element = HTMLButtonElement> = {
	blur: CustomEventHandler<FocusEvent, T>;
	focus: CustomEventHandler<FocusEvent, T>;
	keydown: CustomEventHandler<KeyboardEvent, T>;
	pointerdown: CustomEventHandler<PointerEvent, T>;
	pointerenter: CustomEventHandler<PointerEvent, T>;
	pointerleave: CustomEventHandler<PointerEvent, T>;
};
type ContentEvents<T extends Element = HTMLDivElement> = {
	pointerdown: CustomEventHandler<PointerEvent, T>;
	pointerenter: CustomEventHandler<PointerEvent, T>;
};

export type {
	Props,
	ArrowProps,
	TriggerProps,
	ContentProps,
	//
	Props as TooltipProps,
	ArrowProps as TooltipArrowProps,
	ContentProps as TooltipContentProps,
	TriggerProps as TooltipTriggerProps,
	//
	TriggerEvents,
	ContentEvents,
	//
	TriggerEvents as TooltipTriggerEvents,
	ContentEvents as TooltipContentEvents
};
