import i18n, { type Config } from 'sveltekit-i18n';
import { dev } from '$app/environment';
import lang from './lang.json';

export const defaultLocale = 'en';

export const config: Config = {
	log: {
		level: dev ? 'warn' : 'error'
	},
	translations: {
		en: { lang },
		es: { lang }
	},
	loaders: [
		{
			locale: 'en',
			key: '',
			routes: ['/dashboard'],
			loader: async () => (await import('./translations/en/component.json')).default
		},
		{
			locale: 'en',
			key: '',
			routes: ['/dashboard'],
			loader: async () => (await import('./translations/en/page/dashboard.json')).default
		},
		{
			locale: 'en',
			key: '',
			routes: ['/inventory/product-types/departments'],
			loader: async () =>
				(await import('./translations/en/page/inventory/product-types/departments.json')).default
		},
		{
			locale: 'es',
			key: '',
			loader: async () => (await import('./translations/es/component.json')).default
		},
		{
			locale: 'es',
			key: '',
			routes: ['/dashboard'],
			loader: async () => (await import('./translations/es/page/dashboard.json')).default
		},
		{
			locale: 'es',
			key: '',
			routes: ['/inventory/product-types/departments'],
			loader: async () =>
				(await import('./translations/es/page/inventory/product-types/departments.json')).default
		}
	]
};

export const {
	t,
	loading,
	locales,
	locale,
	translations,
	loadTranslations,
	addTranslations,
	setLocale,
	setRoute
} = new i18n(config);

loading.subscribe(($loading) => $loading && console.log('Loading translations...'));
