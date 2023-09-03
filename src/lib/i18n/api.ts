import type { Cookies } from '@sveltejs/kit';
import i18next from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';

i18next
	.use(resourcesToBackend(async (language: string) => import(`./locales/server/${language}.json`)))
	.init({ lng: 'en', fallbackLng: 'en', debug: false });

export type WithT = { $t: (key: string, params?: Record<string, string>) => string };
export const i18n = (cookies: Cookies): Promise<WithT> =>
	i18next
		.changeLanguage(cookies.get('lang') || 'en')
		.then((t) => ({ $t: (key: string, params?: Record<string, string>) => t(key, params) }));
