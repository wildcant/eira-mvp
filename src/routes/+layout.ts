import { locale, waitLocale } from '$lib/i18n'; // Import to initialize.

export const load = async ({ data }) => {
	locale.set(data.locale);
	await waitLocale();
	return data;
};
