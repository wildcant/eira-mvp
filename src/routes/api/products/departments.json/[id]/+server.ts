import { db } from '$lib/database';
import { exists } from '$lib/database/helpers/validations';
import { json } from '@sveltejs/kit';

export const DELETE = async ({ params, locals: { $t } }) => {
	const id = parseInt(params.id, 10);
	await exists({ table: 'Department', id, $t });

	const [r] = await db.deleteFrom('Department').where('id', '=', id).execute();

	return json({ suceded: r.numDeletedRows > 0 });
};

export const PUT = async ({ params, request, locals: { $t, schemas } }) => {
	const id = parseInt(params.id, 10);
	await exists({ table: 'Department', id, $t });

	const body = schemas.department.partial().parse(await request.json());

	const { name, color } = body;
	const [r] = await db
		.updateTable('Department')
		.set({ name, color })
		.where('id', '=', id)
		.execute();

	return json({ suceded: r.numUpdatedRows > 0 });
};
