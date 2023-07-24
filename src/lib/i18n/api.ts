import type { Cookies } from '@sveltejs/kit';
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import path from 'path';

i18next.use(Backend).init(
	{
		lng: 'en',
		fallbackLng: 'en',
		// preload: ['en', 'es'],
		backend: {
			loadPath: path.resolve('src/lib/i18n/locales/server/{{lng}}.json')
		},
		debug: false
	},
	(err) => {
		if (err) return console.error(err);
		console.log('i18next is ready...');
	}
);

export type WithT = { $t: (key: string) => string };
export const i18n = (cookies: Cookies): Promise<WithT> =>
	i18next
		.changeLanguage(cookies.get('lang') || 'en')
		.then((t) => ({ $t: (key: string) => t(key) }));
