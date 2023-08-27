export type Item = {
	id: string;
	title: string;
	href: `${Routes}`;
	icon: ConstructorOfATypedSvelteComponent;
	children?: Item[] | undefined;
};

export enum Routes {
	DASHBOARD = '/dashboard',
	INVENTORY = '/inventory',
	INVENTORY_SETTINGS = '/inventory/settings',
	PRODUCTS = '/inventory/products',
	PRODUCT_TYPES = '/inventory/product-types',
	POS = '/pos',
	POS_ORDERS = '/pos/orders'
}

export type Route = {
	href: string;
	label: string;
};
