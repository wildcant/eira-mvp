import type { HTMLDivAttributes } from '$lib/components/internal/index.js';

type Props = {
	ratio: number;
} & HTMLDivAttributes;

export type {
	Props,
	//
	Props as AspectRatioProps
};
