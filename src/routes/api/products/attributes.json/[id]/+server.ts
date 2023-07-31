import { db } from '$lib/database';
import { exists } from '$lib/database/helpers/validations';
import { json } from '@sveltejs/kit';

export const DELETE = async ({ params, locals: { $t } }) => {
	const id = parseInt(params.id, 10);
	await exists({ table: 'ProductsAttribute', id, $t });

	const [r] = await db.deleteFrom('ProductsAttribute').where('id', '=', id).execute();

	return json({ suceded: r.numDeletedRows > 0 });
};

export const PUT = async ({ params, request, locals: { $t, schemas } }) => {
	const id = parseInt(params.id, 10);
	await exists({ table: 'ProductsAttribute', id, $t });

	const body = schemas.productsAttribute.partial().parse(await request.json());

	const { name, unitOfMeasure } = body;
	const [r] = await db
		.updateTable('ProductsAttribute')
		.set({ name, unitOfMeasure })
		.where('id', '=', id)
		.execute();

	return json({ suceded: r.numUpdatedRows > 0 });
};
