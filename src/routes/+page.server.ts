import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ url }) => {
	if (url.pathname === '/') {
		throw redirect(303, '/dashboard');
	}
	return {};
}) satisfies PageServerLoad;
