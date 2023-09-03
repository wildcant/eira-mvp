import type { Attribute } from '$lib/api/types';
import type { Item } from '$lib/components/custom/autocomplete';
import type { ProductSchema } from '$lib/schemas/product';

export type AttributeItem = Item<number, Attribute>;
export type LocalAttribute = NonNullable<Partial<ProductSchema['attributes']>[0]>;
