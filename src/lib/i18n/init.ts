import { browser } from '$app/environment';
import { getLanguageCookie } from '$components/header/components/language-selector/helpers';
import { init, register } from 'svelte-i18n';

const defaultLocale = 'en';

register('en', () => import('./locales/client/en.json'));
register('es', () => import('./locales/client/es.json'));

init({
	fallbackLocale: defaultLocale,
	initialLocale: browser ? getLanguageCookie() ?? window.navigator.language : defaultLocale
});
