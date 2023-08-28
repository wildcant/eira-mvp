import { db } from '$lib/database';
import { join } from '$lib/database/helpers/joins';
import { exists } from '$lib/database/helpers/validations';
import { json } from '@sveltejs/kit';

export const GET = async ({ params, locals: { $t } }) => {
	const id = parseInt(params.id, 10);
	await exists({ table: 'Product', id, $t });

	const [{ attributes }] = await db
		.selectFrom('Product')
		.select((eb) => [join.Product.with.ProductAttributeList(eb)])
		.where('id', '=', id)
		.execute();

	return json({ data: attributes });
};
