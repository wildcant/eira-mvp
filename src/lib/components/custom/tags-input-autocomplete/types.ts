import type { Tag } from '@melt-ui/svelte';

export type CustomTag<TMeta = void> = TMeta extends void ? Tag : Tag & { meta: TMeta };
