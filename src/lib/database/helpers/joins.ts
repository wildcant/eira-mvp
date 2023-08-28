import type { ExpressionBuilder } from 'kysely';
import type { DB } from 'kysely-codegen';
import { jsonArrayFrom, jsonObjectFrom } from './sqlite';

type Join = {
	[table in keyof DB]?: {
		with: {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			[joinTable in Exclude<keyof DB, table>]?: (eb: ExpressionBuilder<DB, table>) => any;
		};
	};
};

export const join = {
	Category: {
		with: {
			Department: (eb) => {
				return jsonObjectFrom(
					eb
						.selectFrom('Department')
						.select([
							'Department.id',
							'Department.name',
							'Department.color',
							'Department.createdAt',
							'Department.updatedAt'
						])
						.whereRef('Category.departmentId', '=', 'Department.id')
				).as('department');
			}
		}
	},
	SubCategory: {
		with: {
			Category: (eb) => {
				return jsonObjectFrom(
					eb
						.selectFrom('Category')
						.select([
							'Category.id',
							'Category.name',
							'Category.departmentId',
							'Category.createdAt',
							'Category.updatedAt'
						])
						.whereRef('SubCategory.categoryId', '=', 'Category.id')
				).as('category');
			}
		}
	},
	Product: {
		with: {
			Department: (eb) => {
				return jsonObjectFrom(
					eb
						.selectFrom('Department')
						.select(['Department.id', 'Department.name', 'Department.color'])
						.whereRef('Product.departmentId', '=', 'Department.id')
				).as('department');
			},
			Category: (eb) => {
				return jsonObjectFrom(
					eb
						.selectFrom('Category')
						.select(['Category.id', 'Category.name'])
						.whereRef('Product.categoryId', '=', 'Category.id')
				).as('category');
			},
			SubCategory: (eb) => {
				return jsonObjectFrom(
					eb
						.selectFrom('SubCategory')
						.select(['SubCategory.id', 'SubCategory.name'])
						.whereRef('Product.subCategoryId', '=', 'SubCategory.id')
				).as('subCategory');
			},
			Image: (eb) => {
				return jsonObjectFrom(
					eb
						.selectFrom('Image')
						.select(['Image.id', 'Image.url', 'Image.createdAt', 'Image.updatedAt'])
						.whereRef('Product.imageId', '=', 'Image.id')
				).as('image');
			},
			ProductAttributeList: (eb) => {
				return jsonArrayFrom(
					eb
						.selectFrom('ProductAttributeList')
						.innerJoin(
							'ProductAttribute',
							'ProductAttribute.id',
							'ProductAttributeList.productAttributeId'
						)
						.select((eb2) => [
							'ProductAttributeList.id',
							'ProductAttributeList.productAttributeId',
							'ProductAttribute.name',
							'ProductAttribute.unitOfMeasure',
							jsonArrayFrom(
								eb2
									.selectFrom('ProductAttributeValueList')
									.innerJoin(
										'ProductAttributeValue',
										'ProductAttributeValue.id',
										'ProductAttributeValueList.productAttributeValueId'
									)
									.select(['ProductAttributeValue.id', 'ProductAttributeValue.name'])
									.whereRef(
										'ProductAttributeList.id',
										'=',
										'ProductAttributeValueList.productAttributeListId'
									)
							).as('values'),
							'ProductAttributeList.createdAt',
							'ProductAttributeList.updatedAt'
						])
						.whereRef('Product.id', '=', 'ProductAttributeList.productId')
				).as('attributes');
			}
		}
	},
	ProductVariant: {
		with: {
			Image: (eb) => {
				return jsonObjectFrom(
					eb
						.selectFrom('Image')
						.select(['Image.id', 'Image.url', 'Image.createdAt', 'Image.updatedAt'])
						.whereRef('ProductVariant.imageId', '=', 'Image.id')
				).as('image');
			},
			ProductVariantAttribute: (eb) => {
				return jsonArrayFrom(
					eb
						.selectFrom('ProductVariantAttribute')
						.innerJoin(
							'ProductAttribute',
							'ProductAttribute.id',
							'ProductVariantAttribute.attributeId'
						)
						.innerJoin(
							'ProductAttributeValue',
							'ProductAttributeValue.id',
							'ProductVariantAttribute.attributeValueId'
						)
						.select([
							'ProductVariantAttribute.id',
							'ProductVariantAttribute.attributeId',
							'ProductVariantAttribute.attributeValueId',
							'ProductAttribute.name as name',
							'ProductAttributeValue.name as value'
						])
						.whereRef('ProductVariant.id', '=', 'ProductVariantAttribute.variantId')
				).as('attributes');
			}
		}
	},
	ProductAttribute: {
		with: {
			ProductAttributeValue: (eb) => {
				return jsonArrayFrom(
					eb
						.selectFrom('ProductAttributeValue')
						.select([
							'ProductAttributeValue.id',
							'ProductAttributeValue.name',
							'ProductAttributeValue.createdAt',
							'ProductAttributeValue.updatedAt'
						])
						.whereRef('ProductAttribute.id', '=', 'ProductAttributeValue.productAttributeId')
				).as('values');
			}
		}
	}
} satisfies Join;
