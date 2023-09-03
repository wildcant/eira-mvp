import '$lib/i18n/init'; // Import to initialize
import { waitLocale } from '$lib/i18n';

export const load = async ({ data }) => {
	await waitLocale();
	return data;
};
