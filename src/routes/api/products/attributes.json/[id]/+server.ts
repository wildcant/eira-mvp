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

	const { name, unitOfMeasure, values } = schemas.productsAttribute
		.partial()
		.parse(await request.json());

	const [r] = await db.transaction().execute(async (trx) => {
		// compare existing values with provided values and define deleted and added values
		const currentValues = await trx
			.selectFrom('ProductsAttributeValue')
			.select(['id', 'name'])
			.where('ProductsAttributeValue.productsAttributeId', '=', id)
			.execute();

		const deletedValuesIds = currentValues
			?.filter(({ name }) => !values?.map((v) => v).includes(name))
			.map(({ id }) => id);
		const addedValues = values
			?.filter((v) => !currentValues.map((v) => v.name).includes(v))
			.map((v) => ({ name: v, productsAttributeId: id }));

		if (deletedValuesIds.length)
			await trx.deleteFrom('ProductsAttributeValue').where('id', 'in', deletedValuesIds).execute();

		if (addedValues?.length)
			await trx.insertInto('ProductsAttributeValue').values(addedValues).execute();

		return trx
			.updateTable('ProductsAttribute')
			.set({ name, unitOfMeasure })
			.where('id', '=', id)
			.execute();
	});

	return json({ suceded: r.numUpdatedRows > 0 });
};
