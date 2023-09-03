import type { DatabaseTypes } from '$lib/database/types';
import type { PaginatedApiResponse, Prettify } from '$lib/types';

export type Department = DatabaseTypes['Department'];
export type GetDepartmentsResponse = PaginatedApiResponse<Department>;

export type Category = Prettify<
	DatabaseTypes['Category'] & { department?: DatabaseTypes['Department'] }
>;
export type GetCategoriesResponse = PaginatedApiResponse<Category>;

export type SubCategory = Prettify<
	DatabaseTypes['SubCategory'] & { category?: DatabaseTypes['Category'] }
>;
export type GetSubCategoriesResponse = PaginatedApiResponse<SubCategory>;

export type Attribute = Prettify<
	DatabaseTypes['Attribute'] & {
		values?: AttributeValue[];
	}
>;
export type GetAttributeResponse = PaginatedApiResponse<Attribute>;

export type AttributeValue = DatabaseTypes['AttributeValue'];
export type GetAttributeValueResponse = PaginatedApiResponse<AttributeValue>;

export type Tax = DatabaseTypes['Tax'];
export type GetTaxesResponse = PaginatedApiResponse<Tax>;

export type Image = DatabaseTypes['Image'];

export type ProductAttribute = Prettify<
	Omit<DatabaseTypes['ProductAttribute'], 'attributeId' | 'productId'> & {
		attribute: Attribute | null;
		values: ({
			productAttributeValueId: DatabaseTypes['ProductAttributeValue']['id'];
		} & Omit<AttributeValue, 'attributeId'>)[];
	}
>;

export type Product = Prettify<
	DatabaseTypes['Product'] & {
		image?: Image;
		department?: Department;
		category?: Category;
		subCategory?: SubCategory;
		attributes?: ProductAttribute[];
	}
>;

export type GetProductsResponse = PaginatedApiResponse<Product>;
export type GetProductResponse<T extends keyof Product = keyof Product> = {
	data: Pick<Product, T>;
};
export type GetProductAttributesResponse = PaginatedApiResponse<ProductAttribute>;

export type ProductVariant = DatabaseTypes['ProductVariant'];
export type GetProductVariantsResponse = PaginatedApiResponse<ProductVariant>;
