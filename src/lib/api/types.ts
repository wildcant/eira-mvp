import type { DatabaseTypes } from '$lib/database/types';
import type { PaginatedApiResponse } from '$lib/types';

export type Department = DatabaseTypes['Department'];
export type GetDepartmentsResponse = PaginatedApiResponse<Department>;

export type Category = DatabaseTypes['Category'] & { department?: DatabaseTypes['Department'] };
export type GetCategoriesResponse = PaginatedApiResponse<Category>;

export type SubCategory = DatabaseTypes['SubCategory'] & { category?: DatabaseTypes['Category'] };
export type GetSubCategoriesResponse = PaginatedApiResponse<SubCategory>;

// TODO: There should be a distinction between product attributes (attributes linked to products) and general attributes (attributes from product attributes table).
// TODO: Fix type error in src/routes/api/products/attributes.json/+server.ts.
export type ProductAttribute = Pick<
	DatabaseTypes['ProductAttributeList'],
	'id' | 'productAttributeId' | 'createdAt' | 'updatedAt'
> &
	Pick<DatabaseTypes['ProductAttribute'], 'name' | 'unitOfMeasure'> & {
		values?: Pick<DatabaseTypes['ProductAttributeValue'], 'id' | 'name'>[] | [];
	};
export type GetProductAttributeResponse = PaginatedApiResponse<ProductAttribute>;

export type ProductAttributeValue = DatabaseTypes['ProductAttributeValue'];
export type GetProductAttributeValueResponse = PaginatedApiResponse<ProductAttributeValue>;

export type Tax = DatabaseTypes['Tax'];
export type GetTaxesResponse = PaginatedApiResponse<Tax>;

export type Image = DatabaseTypes['Image'];

export type Product = DatabaseTypes['Product'] & {
	image?: DatabaseTypes['Image'];
	department?: Department;
	category?: Category;
	subCategory?: SubCategory;
};
export type GetProductsResponse = PaginatedApiResponse<Product>;

export type ProductVariant = DatabaseTypes['ProductVariant'];
export type GetProductVariantsResponse = PaginatedApiResponse<ProductVariant>;
