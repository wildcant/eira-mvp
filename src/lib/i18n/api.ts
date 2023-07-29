import type { Cookies } from '@sveltejs/kit';
import i18next from 'i18next';
// import FileSystemBackend from 'i18next-fs-backend';
import resourcesToBackend from 'i18next-resources-to-backend';

i18next
	// .use(FileSystemBackend)
	.use(resourcesToBackend(async (language: string) => import(`./locales/server/${language}.json`)))
	.init(
		{
			lng: 'en',
			fallbackLng: 'en',
			// preload: ['en', 'es'],
			// backend: {
			// 	loadPath: path.resolve('src/lib/i18n/locales/server/{{lng}}.json')
			// },
			debug: false
		},
		(err) => {
			if (err) return console.error(err);
			console.info('i18next is ready...');
		}
	);

export type WithT = { $t: (key: string, params?: Record<string, string>) => string };
export const i18n = (cookies: Cookies): Promise<WithT> =>
	i18next
		.changeLanguage(cookies.get('lang') || 'en')
		.then((t) => ({ $t: (key: string, params?: Record<string, string>) => t(key, params) }));
