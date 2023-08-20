import { db } from '$lib/database';
import { exists } from '$lib/database/helpers/validations';
import { json } from '@sveltejs/kit';

export const DELETE = async ({ params, locals: { $t } }) => {
	const id = parseInt(params.id, 10);
	await exists({ table: 'ProductAttribute', id, $t });

	const [r] = await db.deleteFrom('ProductAttribute').where('id', '=', id).execute();

	return json({ suceded: r.numDeletedRows > 0 });
};

export const PUT = async ({ params, request, locals: { $t, schemas } }) => {
	const id = parseInt(params.id, 10);
	await exists({ table: 'ProductAttribute', id, $t });

	const { name, unitOfMeasure, values } = schemas.productAttribute
		.partial()
		.parse(await request.json());

	const [r] = await db.transaction().execute(async (trx) => {
		// compare existing values with provided values and define deleted and added values
		const currentValues = await trx
			.selectFrom('ProductAttributeValue')
			.select(['id', 'name'])
			.where('ProductAttributeValue.productAttributeId', '=', id)
			.execute();

		const deletedValuesIds = currentValues
			?.filter(({ name }) => !values?.map((v) => v).includes(name))
			.map(({ id }) => id);
		const addedValues = values
			?.filter((v) => !currentValues.map((v) => v.name).includes(v))
			.map((v) => ({ name: v, productAttributeId: id }));

		if (deletedValuesIds.length)
			await trx.deleteFrom('ProductAttributeValue').where('id', 'in', deletedValuesIds).execute();

		if (addedValues?.length)
			await trx.insertInto('ProductAttributeValue').values(addedValues).execute();

		return trx
			.updateTable('ProductAttribute')
			.set({ name, unitOfMeasure })
			.where('id', '=', id)
			.execute();
	});

	return json({ suceded: r.numUpdatedRows > 0 });
};
