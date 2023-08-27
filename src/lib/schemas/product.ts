import { t } from '$lib/i18n';
import type { WithT } from '$lib/i18n/api';
import sum from 'lodash/sum';
import { derived } from 'svelte/store';
import { z } from 'zod';
import { generateTaxSchema } from './tax';
import { isUndefined } from 'lodash';

const generateProductVariantTaxSchema = ({ $t }: WithT) =>
	generateTaxSchema({ $t }).pick({ amount: true, type: true }).extend({ id: z.number().int() });

type ProductVariantTaxZodSchema = ReturnType<typeof generateProductVariantTaxSchema>;
export type ProductVariantTax = z.infer<ProductVariantTaxZodSchema>;

export const computeTotal = (subtotal: number, taxes: ProductVariantTax[]): number => {
	const total =
		(subtotal ?? 0) -
		sum(
			taxes?.map((tax) =>
				tax.type === 'fixed' ? tax.amount : (tax.amount / 100) * (subtotal ?? 0)
			)
		);

	return parseFloat(total.toFixed(2));
};

export const generateProductVariantsSchema = ({ $t }: WithT) =>
	z.object({
		image: z
			.object({
				id: z.coerce.number().int(),
				url: z.string()
			})
			.optional(),
		price: z.coerce.number().default(0),
		totalPrice: z.coerce.number().default(0),
		salesTaxes: generateProductVariantTaxSchema({ $t }).array().default([]),
		averageCost: z.coerce.number().default(0),
		cost: z.coerce.number().default(0),
		totalCost: z.coerce.number().default(0),
		purchasesTaxes: generateProductVariantTaxSchema({ $t }).array().default([]),
		sku: z.string().default(''),
		barcode: z.string().default(''),
		stock: z.coerce.number().int().default(0),

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

const generateVariantAttributeSchema = ({ $t }: WithT) =>
	z.object({
		key: z.string(),
		id: z
			.number()
			.int()
			.refine((v) => !!v, {
				message: `
			${$t('entity.attribute.singular.capitalize')} 
			${$t('common.phrase.is-required')}
			`
			}),
		name: z.string(),
		values: z
			.object({
				id: z.number().int(),
				name: z.string()
			})
			.array()
			.min(1, { message: 'At least one value is required.' })
			.optional()
			.default([]),
		optional: z.boolean().default(false)
	});

type VariantAttributeZodSchema = ReturnType<typeof generateVariantAttributeSchema>;
export type VariantAttributeSchema = z.infer<VariantAttributeZodSchema>;

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
		attributes: generateVariantAttributeSchema({ $t })
			.array()
			.refine((items) => new Set(items.map((item) => item.id)).size === items.length, {
				message: 'Attributes must be unique'
			})
			.default([]),
		/*
			[
				{
					key: '8',
					id: 5,
					name: 'forma farmacéutica',
					optional: false,
					values: [
						{
							id: 16,
							name: 'Tabletas'
						},
						{
							id: 17,
							name: 'Cápsulas'
						}
					]
				},
				{
					key: '9',
					id: 3,
					name: 'unidades',
					optional: false,
					values: [
						{
							id: 14,
							name: '200'
						},
						{
							id: 12,
							name: '28'
						}
					]
				}
			]
			*/
		variants: generateProductVariantsSchema({ $t }).array().default([])
	});

export const productsSchema = derived(t, ($t) => generateProductsSchema({ $t }));

export type ProductZodSchema = ReturnType<typeof generateProductsSchema>;
export type ProductSchema = z.infer<ProductZodSchema>;
