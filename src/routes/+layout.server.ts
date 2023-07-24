import { defaultLocale, locales, type Locales } from '$lib/i18n';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ cookies, request }) => {
	let userLocale = (cookies.get('lang') || '').toLowerCase() as Locales;
	if (!userLocale) {
		userLocale = `${`${request.headers.get('accept-language')}`.match(
			/[a-zA-Z]+?(?=-|_|,|;)/
		)}`.toLowerCase() as Locales;
	}

	let locale = userLocale;
	if (!locales.includes(userLocale)) {
		locale = defaultLocale;
	}

	return {
		locale,

		/** For reference @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent#mobile_tablet_or_desktop */
		isMobile: request.headers.get('user-agent')?.includes('Mobi')
	};
}) satisfies LayoutServerLoad;
