import type { DatabaseTypes } from '$lib/database/types';
import { departmentSchema } from '$lib/schemas/department';
import type { PaginatedApiResponse } from '$lib/types';
import { error, fail } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms/server';

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
	create: async ({ request, fetch }) => {
		const form = await superValidate(request, departmentSchema);

		if (!form.valid) return fail(400, { form });

		const response = await fetch(`/api/products/departments.json`, {
			method: 'post',
			body: JSON.stringify(form.data)
		});

		const json = await response.json();

		if (!response.ok) return setError(form, json.message);
	}
};
