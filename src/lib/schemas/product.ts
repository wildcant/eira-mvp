import { t } from '$lib/i18n';
import type { WithT } from '$lib/i18n/api';
import sum from 'lodash/sum';
import { derived } from 'svelte/store';
import { z } from 'zod';
import { generateTaxSchema } from './tax';
import isUndefined from 'lodash/isUndefined';
import uniqueId from 'lodash/uniqueId';

const generateProductVariantTaxSchema = ({ $t }: WithT) =>
	generateTaxSchema({ $t }).pick({ amount: true, type: true }).extend({ id: z.number().int() });

type ProductVariantTaxZodSchema = ReturnType<typeof generateProductVariantTaxSchema>;
export type ProductVariantTax = z.infer<ProductVariantTaxZodSchema>;

export const computeTotal = (subtotal = 0, taxes: ProductVariantTax[] = []): number => {
	const total =
		subtotal -
		sum(taxes?.map((tax) => (tax.type === 'fixed' ? tax.amount : (tax.amount / 100) * subtotal)));

	return parseFloat(total.toFixed(2));
};

export const generateProductVariantsSchema = ({ $t }: WithT) =>
	z.object({
		key: z.string().default(uniqueId()).optional(),
		image: z
			.object({
				id: z.coerce.number().int(),
				url: z.string()
			})
			.optional(),
		price: z.coerce.number().default(0).optional(),
		totalPrice: z.coerce.number().default(0).optional(),
		salesTaxes: generateProductVariantTaxSchema({ $t }).array().default([]).optional(),
		averageCost: z.coerce.number().default(0).optional(),
		cost: z.coerce.number().default(0).optional(),
		totalCost: z.coerce.number().default(0).optional(),
		purchasesTaxes: generateProductVariantTaxSchema({ $t }).array().default([]).optional(),
		sku: z.string().default('').optional(),
		barcode: z.string().default('').optional(),
		stock: z.coerce.number().int().default(0).optional(),

		// TODO: Validate unique attributes combinations.
		// could dynamically filter attributes options so that user doesn't choose an existing combo. (help user so that they don't end up in wrong state)
		attributes: z.record(
			z.coerce.number().int().describe('The id of the attribute'),
			z
				.object({
					value: z.coerce.number().int().optional().describe('The id of the attribute value'),
					optional: z.boolean().default(false).describe('If the attribute is optional')
				})
				.refine((attr) => attr.optional || (attr.optional === false && !isUndefined(attr.value)), {
					message: 'Required'
				})
		)
	});

export const productVariantsSchema = derived(t, ($t) => generateProductVariantsSchema({ $t }));

export type ProductVariantZodSchema = ReturnType<typeof generateProductVariantsSchema>;
export type ProductVariantSchema = z.infer<ProductVariantZodSchema>;

export const generateProductAttributeSchema = ({ $t }: WithT) =>
	z.object({
		key: z.string().default(uniqueId()),
		id: z.number().int().optional().describe('id of the product attribute, used when editing'),
		attribute: z.object({
			id: z
				.number()
				.int()
				.refine((v) => !!v, {
					message: `
			${$t('entity.attribute.singular.capitalize')} 
			${$t('common.phrase.is-required')}
			`
				}),
			name: z.string()
		}),
		values: z
			.object({
				productAttributeValueId: z.number().int().optional(),
				id: z.number().int(),
				name: z.string()
			})
			.array()
			.min(1, { message: 'At least one value is required.' })
			.optional()
			.default([]),
		optional: z.boolean().default(false)
	});

export const productAttributeSchema = derived(t, ($t) => generateProductAttributeSchema({ $t }));

export type ProductAttributeZodSchema = ReturnType<typeof generateProductAttributeSchema>;
export type ProductAttributeSchema = z.infer<ProductAttributeZodSchema>;

export const generateProductCategorizationSchema = ({ $t }: WithT) =>
	z.object({
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
		subCategoryId: z.coerce.number().int().optional()
	});

export const productCategorizationSchema = derived(t, ($t) =>
	generateProductCategorizationSchema({ $t })
);
export type ProductCategorizationZodSchema = ReturnType<typeof generateProductCategorizationSchema>;
export type ProductCategorizationSchema = z.infer<ProductCategorizationZodSchema>;

export const generateProductsSchema = ({ $t }: WithT) => {
	const categorizationSchema = generateProductCategorizationSchema({ $t });
	return z.object({
		name: z
			.string()
			.min(1, {
				message: `${$t('common.word.name.capitalize')} ${$t('common.phrase.is-required')}`
			})
			.max(100),
		description: z.string().max(300).optional().nullable(),
		departmentId: categorizationSchema.shape.departmentId,
		categoryId: categorizationSchema.shape.categoryId,
		subCategoryId: categorizationSchema.shape.subCategoryId,
		imageId: z.coerce.number().int().optional(),
		attributes: generateProductAttributeSchema({ $t })
			.array()
			.refine((items) => new Set(items.map((item) => item.attribute.id)).size === items.length, {
				message: 'Attributes must be unique'
			})
			.default([]),
		variants: generateProductVariantsSchema({ $t }).array().default([])
	});
};

export const productsSchema = derived(t, ($t) => generateProductsSchema({ $t }));

export type ProductZodSchema = ReturnType<typeof generateProductsSchema>;
export type ProductSchema = z.infer<ProductZodSchema>;
