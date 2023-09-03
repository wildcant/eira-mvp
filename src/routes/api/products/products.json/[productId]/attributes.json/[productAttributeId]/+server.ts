import { db } from '$lib/database';
import { exists } from '$lib/database/helpers/validations';
import { error, json } from '@sveltejs/kit';

export const DELETE = async ({ params, locals: { $t } }) => {
	const productId = parseInt(params.productId, 10);
	await exists({ table: 'Product', id: productId, $t });

	const productAttributeId = parseInt(params.productAttributeId, 10);
	await exists({ table: 'ProductAttribute', id: productAttributeId, $t });

	const [r] = await db
		.deleteFrom('ProductAttribute')
		.where('id', '=', productAttributeId)
		.execute();

	return json({ suceded: r.numDeletedRows > 0 });
};

export const PUT = async ({ params, request, locals: { $t, schemas } }) => {
	const productId = parseInt(params.productId, 10);
	await exists({ table: 'Product', id: productId, $t });

	const productAttributeId = parseInt(params.productAttributeId, 10);
	await exists({ table: 'ProductAttribute', id: productAttributeId, $t });

	const { attribute, values } = schemas.productAttribute.partial().parse(await request.json());

	if (!attribute) throw error(400, 'Missing attribute');

	const suceded = await db.transaction().execute(async (trx) => {
		// compare existing values with provided values and define deleted and added values
		const currentValues = await trx
			.selectFrom('ProductAttributeValue')
			.select(['id'])
			.where('ProductAttributeValue.productAttributeId', '=', productAttributeId)
			.execute();

		const deletedValuesIds = currentValues
			?.filter(({ id }) => !values?.map((v) => v.id).includes(id))
			.map(({ id }) => id);
		const addedValues = values
			?.filter(({ id }) => !currentValues.map((v) => v.id).includes(id))
			.map((v) => ({ productAttributeId, attributeValueId: v.id }));

		if (deletedValuesIds.length)
			await trx.deleteFrom('ProductAttributeValue').where('id', 'in', deletedValuesIds).execute();

		if (addedValues?.length)
			await trx.insertInto('ProductAttributeValue').values(addedValues).execute();

		await trx
			.updateTable('ProductAttribute')
			.set({ attributeId: attribute?.id })
			.where('id', '=', productAttributeId)
			.execute();

		return true;
	});

	return json({ suceded });
};
