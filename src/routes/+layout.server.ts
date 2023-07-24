import { defaultLocale, loadTranslations, locales, translations } from '$lib/i18n';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ url, cookies, request }) => {
	let locale = (cookies.get('lang') || '').toLowerCase();
	if (!locale) {
		locale = `${`${request.headers.get('accept-language')}`.match(
			/[a-zA-Z]+?(?=-|_|,|;)/
		)}`.toLowerCase();
	}

	const supportedLocales = locales.get().map((l) => l.toLowerCase());

	if (!supportedLocales.includes(locale)) {
		locale = defaultLocale;
	}

	const { pathname } = url;
	await loadTranslations(locale, pathname);

	return {
		isMobile: request.headers.get('user-agent')?.includes('Mobi'),
		i18n: { locale, route: pathname },
		translations: translations.get()
	};
}) satisfies LayoutServerLoad;
