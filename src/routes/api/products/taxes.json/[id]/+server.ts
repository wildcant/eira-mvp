import { db } from '$lib/database';
import { exists } from '$lib/database/helpers/validations';
import { json } from '@sveltejs/kit';

export const DELETE = async ({ params, locals: { $t } }) => {
	const id = parseInt(params.id, 10);
	await exists({ table: 'Tax', id, $t });

	const [r] = await db.deleteFrom('Tax').where('id', '=', id).execute();

	return json({ suceded: r.numDeletedRows > 0 });
};

export const PUT = async ({ params, request, locals: { $t, schemas } }) => {
	const id = parseInt(params.id, 10);
	await exists({ table: 'Tax', id, $t });

	const body = schemas.tax.partial().parse(await request.json());

	const { name, amount, scope, type } = body;
	const [r] = await db
		.updateTable('Tax')
		.set({ name, amount, scope, type })
		.where('id', '=', id)
		.execute();

	return json({ suceded: r.numUpdatedRows > 0 });
};
