import type { DatabaseTypes } from '$lib/database/types';
import type { PaginatedApiResponse } from '$lib/types';

export type Department = DatabaseTypes['Department'];
export type GetDepartmentsResponse = PaginatedApiResponse<Department>;

export type Category = DatabaseTypes['Category'] & { department?: DatabaseTypes['Department'] };
export type GetCategoriesResponse = PaginatedApiResponse<Category>;

export type SubCategory = DatabaseTypes['SubCategory'] & { category?: DatabaseTypes['Category'] };
export type GetSubCategoriesResponse = PaginatedApiResponse<SubCategory>;

export type ProductAttribute = DatabaseTypes['ProductAttribute'] & {
	values?: ProductAttributeValue[];
};
export type GetProductAttributeResponse = PaginatedApiResponse<ProductAttribute>;

export type ProductAttributeValue = DatabaseTypes['ProductAttributeValue'];
export type GetProductAttributeValueResponse = PaginatedApiResponse<ProductAttributeValue>;

export type Tax = DatabaseTypes['Tax'];
export type GetTaxesResponse = PaginatedApiResponse<Tax>;

export type Product = DatabaseTypes['Product'] & {
	image?: DatabaseTypes['Image'];
	department?: Department;
	category?: Category;
	subCategory?: SubCategory;
};
export type GetProductsResponse = PaginatedApiResponse<Product>;

export type ProductVariant = DatabaseTypes['ProductVariant'];
export type GetProductVariantsResponse = PaginatedApiResponse<ProductVariant>;
