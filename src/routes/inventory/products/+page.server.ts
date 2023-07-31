import { redirect } from '@sveltejs/kit';

export const load = async ({ url }) => {
	if (url.pathname === '/inventory/products') {
		throw redirect(303, '/inventory/products/products');
	}
	return {};
};
