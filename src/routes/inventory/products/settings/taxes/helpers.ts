import type { Item } from '$lib/components/custom/autocomplete';
import { t } from '$lib/i18n';
import { taxSchema } from '$lib/schemas';
import { derived, type Readable } from 'svelte/store';

export const taxTypeOptions: Readable<Array<Item<string>>> = derived(
	[t, taxSchema],
	([$t, $taxSchema]) => {
		return Object.values($taxSchema.shape.type.Values).map((type) => ({
			label: $t(`common.word.${type}.capitalize`),
			value: type
		}));
	}
);

export const taxScopeOptions: Readable<Array<Item<string>>> = derived(
	[t, taxSchema],
	([$t, $taxSchema]) => {
		return Object.values($taxSchema.shape.scope.Values).map((scope) => ({
			label: $t(`common.word.${scope}.capitalize`),
			value: scope
		}));
	}
);
