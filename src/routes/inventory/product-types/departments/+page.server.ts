import type { DatabaseTypes } from '$lib/database/types';
import { i18n } from '$lib/i18n/api';
import { departmentSchema } from '$lib/schemas/department';
import type { PaginatedApiResponse } from '$lib/types';
import { error, fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';

export const load = async ({ fetch }) => {
	const response = await fetch(`/api/products/departments.json`);
	const apiResponse = await response.json();
	if (!response.ok) {
		throw error(response.status, apiResponse as { message: string });
	}
	const departmentsJson = apiResponse as PaginatedApiResponse<DatabaseTypes['Department']>;

	const newDepartmentForm = await superValidate(departmentSchema);
	return { departmentsJson, newDepartmentForm };
};

export const actions = {
	update: async ({ request, fetch, cookies }) => {
		const { $t } = await i18n(cookies);
		const form = await superValidate(request, departmentSchema);

		if (!form.valid) return fail(400, { form });

		let response;
		try {
			response = await fetch(`/api/products/departments.json`, {
				method: 'post',
				body: JSON.stringify(form.data)
			});
			const json = await response.json();
			if (!response.ok) throw new Error(json.message);
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : $t('error.internal-server-error');
			return fail(response?.status ?? 500, { form, message: errorMessage });
		}
	}
};
