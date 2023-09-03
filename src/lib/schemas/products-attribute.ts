import { t } from '$lib/i18n';
import type { WithT } from '$lib/i18n/api';
import { derived } from 'svelte/store';
import { z } from 'zod';

export const generateAttributeSchema = ({ $t }: WithT) =>
	z.object({
		name: z
			.string()
			.min(1, {
				message: `${$t('common.word.name.capitalize')} ${$t('common.phrase.is-required')}`
			})
			.max(100),
		unitOfMeasure: z.string().default(''),
		values: z
			.string()
			.array()
			.min(1, {
				message: `${$t('common.word.values.capitalize')} ${$t('common.phrase.is-required')}`
			})
	});

export const attributeSchema = derived(t, ($t) => generateAttributeSchema({ $t }));

export type AttributeZodSchema = ReturnType<typeof generateAttributeSchema>;
export type AttributeSchema = z.infer<AttributeZodSchema>;
