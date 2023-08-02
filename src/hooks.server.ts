import { sqliteCustomErrorMap, zodCustomErrorMap } from '$lib/database/helpers/error-handler';
import { locale } from '$lib/i18n';
import { i18n } from '$lib/i18n/api';
import { generateCategorySchema } from '$lib/schemas/category';
import { generateDepartmentSchema } from '$lib/schemas/department';
import { generateProductsSchema } from '$lib/schemas/product';
import { generateProductsAttributeSchema } from '$lib/schemas/products-attribute';
import { generateSubCategorySchema } from '$lib/schemas/sub-category';
import { error, type Handle, type HandleServerError } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// Set lang from cookies to load client translations.
	const lang =
		event.cookies.get('lang') ?? event.request.headers.get('accept-language')?.split(',')[0];
	if (lang) locale.set(lang);

	// Load server translations with the language set by the user.
	const { $t } = await i18n(event.cookies);
	event.locals.$t = $t;
	event.locals.schemas = {
		department: generateDepartmentSchema({ $t }),
		category: generateCategorySchema({ $t }),
		subCategory: generateSubCategorySchema({ $t }),
		productsAttribute: generateProductsAttributeSchema({ $t }),
		product: generateProductsSchema({ $t })
	};

	return resolve(event);
};

export const handleError: HandleServerError = async ({ error: err, event }) => {
	console.error(err);
	const { $t } = event.locals;
	if (err instanceof Error) {
		if (err.message.includes('Not found')) {
			throw error(404, { message: $t('error.not-found') });
		}
	}

	zodCustomErrorMap(err);
	sqliteCustomErrorMap({ $t, err });
	throw error(500, { message: $t('error.internal-server-error') });
};
