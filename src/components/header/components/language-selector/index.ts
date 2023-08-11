export const getLanguageCookie = () => {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; lang=`);
	if (parts.length === 2) return parts.pop()?.split(';').shift() ?? null;
	return null;
};

export const setLanguageCookie = (lang: string) => {
	document.cookie = `lang=${lang};path=/`;
};

export { default as LanguageSelector } from './language-selector.svelte';
