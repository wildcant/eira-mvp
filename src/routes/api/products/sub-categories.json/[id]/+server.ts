import { db } from '$lib/database';
import { exists } from '$lib/database/helpers/validations';
import { json } from '@sveltejs/kit';

export const DELETE = async ({ params, locals: { $t } }) => {
	const id = parseInt(params.id, 10);
	await exists({ table: 'SubCategory', id, $t });

	const [r] = await db.deleteFrom('SubCategory').where('id', '=', id).execute();

	return json({ suceded: r.numDeletedRows > 0 });
};

export const PUT = async ({ params, request, locals: { $t, schemas } }) => {
	const id = parseInt(params.id, 10);
	await exists({ table: 'SubCategory', id, $t });

	const body = schemas.department.partial().parse(await request.json());
	const [r] = await db.updateTable('SubCategory').set(body).where('id', '=', id).execute();

	return json({ suceded: r.numUpdatedRows > 0 });
};
