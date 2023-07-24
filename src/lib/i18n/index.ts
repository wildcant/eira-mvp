import { browser } from '$app/environment';
import { init, register } from 'svelte-i18n';
export { locale, _ as t, waitLocale } from 'svelte-i18n';

export type Locales = 'en' | 'es';

export const locales = ['en', 'es'] as const;
export const localesLabels = {
	en: 'English',
	es: 'Español'
};

export const defaultLocale: Locales = 'en';

register('en', () => import('./locales/client/en.json'));
register('es', () => import('./locales/client/es.json'));

init({
	fallbackLocale: defaultLocale
	// initialLocale: browser ? window.document.cookie. // we are managing the initial lang by manually setting a cookie
});
