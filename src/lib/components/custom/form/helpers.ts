import { isArray, isObject, isString } from 'lodash';

export const parseFormFieldError = (
	errors: string[] | string | undefined | { _errors: string | string[] } | Record<string, string>,
	index?: number
) => {
	let error = '';

	if (!errors) return error;
	if (isArray(errors) && errors?.length) {
		error = errors.join(', ');
		// For arrays fields the errors are returned within the _errors array.
	} else if (isObject(errors) && index) {
		const err = (errors as Record<string, string>)[index];
		if (isArray(err)) {
			error = (err as unknown as string[]).join(', ');
		} else if (isString(err)) {
			error = err;
		}
	} else if (isObject(errors) && '_errors' in errors && errors._errors) {
		error = isArray(errors._errors) ? errors._errors.join(', ') : (errors._errors as string);
	}

	return error;
};
