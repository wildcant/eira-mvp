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

export const items: Item[] = [
	{
		id: 'dashboard',
		title: 'Dashboard',
		href: Routes.DASHBOARD,
		icon: 'layout-dashboard'
	},
	{
		id: 'inventory',
		title: 'Inventory',
		icon: 'warehouse',
		href: Routes.INVENTORY,
		children: [
			{ id: 'products', title: 'Products', href: Routes.PRODUCTS, icon: 'box' },
			{
				id: 'product-types',
				title: 'Product Types',
				href: Routes.PRODUCT_TYPES,
				icon: 'shapes'
			}
		]
	},
	{
		id: 'point-of-sale',
		title: 'Point of sale',
		icon: 'store',
		href: Routes.POS,
		children: [{ id: 'orders', title: 'Orders', href: Routes.POS_ORDERS, icon: 'layout-list' }]
	}
];
