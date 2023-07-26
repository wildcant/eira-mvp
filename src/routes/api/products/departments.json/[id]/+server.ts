import { db } from '$lib/database';
import { exists } from '$lib/database/helpers/validations';
import { departmentSchema } from '$lib/schemas/department';
import { json } from '@sveltejs/kit';

export const DELETE = async ({ params, locals: { $t } }) => {
	const id = parseInt(params.id, 10);
	await exists({ table: 'Department', id, $t });

	const [r] = await db.deleteFrom('Department').where('id', '=', id).execute();

	return json({ suceded: r.numDeletedRows > 0 });
};

export const PUT = async ({ params, request, locals: { $t } }) => {
	const id = parseInt(params.id, 10);
	await exists({ table: 'Department', id, $t });

	const body = departmentSchema.parse(await request.json());
	const [r] = await db.updateTable('Department').set(body).where('id', '=', id).execute();

	return json({ suceded: r.numUpdatedRows > 0 });
};
