import { db } from '$lib/database';
import { exists } from '$lib/database/helpers/validations';
import { json } from '@sveltejs/kit';

export const DELETE = async ({ params, locals: { $t } }) => {
	const id = parseInt(params.id, 10);
	await exists({ table: 'Product', id, $t });

	const [r] = await db.deleteFrom('Product').where('id', '=', id).execute();

	return json({ suceded: r.numDeletedRows > 0 });
};

export const PUT = async ({ params, request, locals: { $t, schemas } }) => {
	const id = parseInt(params.id, 10);
	await exists({ table: 'Product', id, $t });

	const body = schemas.product.partial().parse(await request.json());

	const [r] = await db.updateTable('Product').set(body).where('id', '=', id).execute();

	return json({ suceded: r.numUpdatedRows > 0 });
};
