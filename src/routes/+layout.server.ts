import type { LayoutServerLoad } from './$types';

export const load = (async ({ request }) => {
	/** For reference @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent#mobile_tablet_or_desktop */
	return { isMobile: request.headers.get('user-agent')?.includes('Mobi') };
}) satisfies LayoutServerLoad;
