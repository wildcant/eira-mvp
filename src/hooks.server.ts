import { sqliteCustomErrorMap, zodCustomErrorMap } from '$lib/database/helpers/error-handler';
import { locale } from '$lib/i18n';
import { i18n } from '$lib/i18n/api';
import { error, type Handle, type HandleServerError } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// Set lang from cookies to load client translations.
	const lang =
		event.cookies.get('lang') ?? event.request.headers.get('accept-language')?.split(',')[0];
	if (lang) locale.set(lang);

	// Load server translations with the language set by the user.
	const { $t } = await i18n(event.cookies);
	event.locals.$t = $t;

	return resolve(event);
};

export const handleError: HandleServerError = async ({ error: err, event }) => {
	console.error(err);
	const { $t } = event.locals;
	zodCustomErrorMap(err);
	sqliteCustomErrorMap({ $t, err });
	throw error(500, { message: $t('error.internal-server-error') });
};
