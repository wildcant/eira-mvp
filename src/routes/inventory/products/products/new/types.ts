import type { ProductAttribute } from '$lib/api/types';
import type { Item } from '$lib/components/custom/autocomplete';
import type { ProductSchema } from '$lib/schemas/product';

export type AttributeItem = Item<number, { values: ProductAttribute['values'] }>;
export type LocalProductAttribute = NonNullable<Partial<ProductSchema['attributes']>[0]>;
