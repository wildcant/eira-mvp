import type { WithT } from '$lib/i18n/api';
import { z } from 'zod';

export const generateCategorySchema = ({ $t }: WithT) =>
	z.object({
		name: z
			.string()
			.min(1, {
				message: `${$t('common.word.name.capitalize')} ${$t('common.phrase.is-required')}`
			})
			.max(100),
		departmentId: z.coerce
			.number()
			.int()
			.min(1, {
				message: `${$t('entity.department.singular.capitalize')} ${$t('common.phrase.is-required')}`
			})
	});

export type CategoryZodSchema = ReturnType<typeof generateCategorySchema>;
export type CategorySchema = z.infer<CategoryZodSchema>;
