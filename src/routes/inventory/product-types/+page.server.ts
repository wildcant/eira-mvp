import { redirect } from '@sveltejs/kit';

export const load = async ({ url }) => {
	if (url.pathname === '/inventory/product-types') {
		throw redirect(303, '/inventory/product-types/departments');
	}
	return {};
};
