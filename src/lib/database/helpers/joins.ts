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
			ProductAttribute: (eb) => {
				return jsonArrayFrom(
					eb
						.selectFrom('ProductAttribute')
						.select((eb2) => [
							'ProductAttribute.id',
							jsonObjectFrom(
								eb2
									.selectFrom('Attribute')
									.select(['Attribute.id', 'Attribute.name', 'Attribute.unitOfMeasure'])
									.whereRef('ProductAttribute.attributeId', '=', 'Attribute.id')
							).as('attribute'),
							jsonArrayFrom(
								eb2
									.selectFrom('ProductAttributeValue')
									.innerJoin(
										'AttributeValue',
										'AttributeValue.id',
										'ProductAttributeValue.attributeValueId'
									)
									.select([
										'ProductAttributeValue.id as productAttributeValueId',
										'AttributeValue.id',
										'AttributeValue.name'
									])
									.whereRef('ProductAttribute.id', '=', 'ProductAttributeValue.productAttributeId')
							).as('values'),
							'ProductAttribute.createdAt',
							'ProductAttribute.updatedAt'
						])
						.whereRef('Product.id', '=', 'ProductAttribute.productId')
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
						.innerJoin('Attribute', 'Attribute.id', 'ProductVariantAttribute.attributeId')
						.innerJoin(
							'AttributeValue',
							'AttributeValue.id',
							'ProductVariantAttribute.attributeValueId'
						)
						.select([
							'ProductVariantAttribute.id',
							'ProductVariantAttribute.attributeId',
							'ProductVariantAttribute.attributeValueId',
							'Attribute.name as name',
							'AttributeValue.name as value'
						])
						.whereRef('ProductVariant.id', '=', 'ProductVariantAttribute.variantId')
				).as('attributes');
			}
		}
	},
	Attribute: {
		with: {
			AttributeValue: (eb) => {
				return jsonArrayFrom(
					eb
						.selectFrom('AttributeValue')
						.select([
							'AttributeValue.id',
							'AttributeValue.name',
							'AttributeValue.createdAt',
							'AttributeValue.updatedAt'
						])
						.whereRef('Attribute.id', '=', 'AttributeValue.attributeId')
				).as('values');
			}
		}
	},
	ProductAttribute: {
		with: {
			Attribute: (eb) => {
				return jsonObjectFrom(
					eb
						.selectFrom('Attribute')
						.select([
							'Attribute.id',
							'Attribute.name',
							'Attribute.unitOfMeasure',
							'Attribute.createdAt',
							'Attribute.updatedAt'
						])
						.whereRef('ProductAttribute.attributeId', '=', 'Attribute.id')
				).as('attribute');
			},
			ProductAttributeValue: (eb) => {
				return jsonArrayFrom(
					eb
						.selectFrom('ProductAttributeValue')
						.innerJoin(
							'AttributeValue',
							'AttributeValue.id',
							'ProductAttributeValue.attributeValueId'
						)
						.select([
							'ProductAttributeValue.id as productAttributeValueId',
							'AttributeValue.id',
							'AttributeValue.name',
							'ProductAttributeValue.createdAt',
							'ProductAttributeValue.updatedAt'
						])
						.whereRef('ProductAttribute.id', '=', 'ProductAttributeValue.productAttributeId')
				).as('values');
			}
		}
	}
} satisfies Join;
