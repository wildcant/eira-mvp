import { t } from '$lib/i18n';
import type { WithT } from '$lib/i18n/api';
import { derived } from 'svelte/store';
import { z } from 'zod';

export const generateSubCategorySchema = ({ $t }: WithT) =>
	z.object({
		name: z
			.string()
			.min(1, {
				message: `${$t('common.word.name.capitalize')} ${$t('common.phrase.is-required')}`
			})
			.max(100),
		categoryId: z.coerce
			.number()
			.int()
			.min(1, {
				message: `${$t('entity.category.singular.capitalize')} ${$t('common.phrase.is-required')}`
			})
	});

export const subCategorySchema = derived(t, ($t) => generateSubCategorySchema({ $t }));

export type SubCategoryZodSchema = ReturnType<typeof generateSubCategorySchema>;
export type SubCategorySchema = z.infer<SubCategoryZodSchema>;
