import { redirect } from '@sveltejs/kit';

export const load = async ({ url, params }) => {
	if (url.pathname === `/inventory/products/products/${params.productId}`) {
		throw redirect(303, `/inventory/products/products/${params.productId}/general-info`);
	}
};
