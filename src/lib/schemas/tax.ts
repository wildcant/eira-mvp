import { t } from '$lib/i18n';
import type { WithT } from '$lib/i18n/api';
import { derived } from 'svelte/store';
import { z } from 'zod';

export const taxAmountSuffix = ({ $t }: WithT): { [key in TaxSchema['type']]: string } => ({
	fixed: ` / ${$t('common.word.unit.lowercase')}`,
	percentage: '%'
});

export const generateTaxSchema = ({ $t }: WithT) =>
	z.object({
		name: z
			.string()
			.min(1, {
				message: `${$t('common.word.name.capitalize')} ${$t('common.phrase.is-required')}`
			})
			.max(100),
		scope: z.enum(['sales', 'purchases']),
		type: z.enum(['percentage', 'fixed']),
		amount: z.coerce.number()
	});

export const taxSchema = derived(t, ($t) => generateTaxSchema({ $t }));

export type TaxZodSchema = ReturnType<typeof generateTaxSchema>;
export type TaxSchema = z.infer<TaxZodSchema>;
