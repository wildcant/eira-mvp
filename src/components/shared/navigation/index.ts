export type NavigationIconName =
	| 'layout-dashboard'
	| 'warehouse'
	| 'box'
	| 'shapes'
	| 'store'
	| 'layout-list';

export type Item = {
	id: string;
	title: string;
	href: `${Routes}`;
	icon: NavigationIconName;
	children?: Item[] | undefined;
};

export enum Routes {
	DASHBOARD = '/dashboard',
	INVENTORY = '/inventory',
	PRODUCTS = '/inventory/products',
	PRODUCT_TYPES = '/inventory/product-types',
	POS = '/pos',
	POS_ORDERS = '/pos/orders'
}
