import { t } from '$lib/i18n';
import type { WithT } from '$lib/i18n/api';
import { derived } from 'svelte/store';
import { z } from 'zod';

export const generateProductsSchema = ({ $t }: WithT) =>
	z.object({
		name: z
			.string()
			.min(1, {
				message: `${$t('common.word.name.capitalize')} ${$t('common.phrase.is-required')}`
			})
			.max(100),
		description: z.string().max(300).optional(),
		departmentId: z.coerce
			.number()
			.int()
			.min(1, {
				message: `${$t('entity.department.singular.capitalize')} ${$t('common.phrase.is-required')}`
			}),
		categoryId: z.coerce
			.number()
			.int()
			.optional()
			.refine((v) => !!v, {
				message: `${$t('entity.category.singular.capitalize')} ${$t('common.phrase.is-required')}`
			}),
		subCategoryId: z.coerce.number().int().optional(),
		imageId: z.coerce.number().int().optional(),
		attributes: z
			.object({
				key: z.string(),
				id: z
					.number()
					.int()
					.optional()
					.refine((v) => !!v, {
						message: `${$t('entity.attribute.singular.capitalize')} ${$t(
							'common.phrase.is-required'
						)}`
					}),
				values: z
					.number()
					.int()
					.array()
					.min(1, { message: 'At least one value is required.' })
					.optional()
					.default([])
			})
			.array()
			.refine((items) => new Set(items.map((item) => item.id)).size === items.length, {
				message: 'Attributes must be unique'
			})
			.default([])
	});

export const productsSchema = derived(t, ($t) => generateProductsSchema({ $t }));

export type ProductZodSchema = ReturnType<typeof generateProductsSchema>;
export type ProductSchema = z.infer<ProductZodSchema>;
