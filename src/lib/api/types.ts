import type { DatabaseTypes } from '$lib/database/types';
import type { PaginatedApiResponse } from '$lib/types';

export type Department = DatabaseTypes['Department'];
export type GetDepartmentsResponse = PaginatedApiResponse<Department>;

export type Category = DatabaseTypes['Category'] & { department?: DatabaseTypes['Department'] };
export type GetCategoriesResponse = PaginatedApiResponse<Category>;

export type SubCategory = DatabaseTypes['SubCategory'] & { category?: DatabaseTypes['Category'] };
export type GetSubCategoriesResponse = PaginatedApiResponse<SubCategory>;
