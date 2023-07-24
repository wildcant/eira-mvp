import { db } from '$lib/database';
import { exists, sqliteCustomErrorMap, zodCustomErrorMap } from '$lib/database/utils.js';
import { i18n, type WithT } from '$lib/i18n/api.js';
import { error, json } from '@sveltejs/kit';
import { z } from 'zod';

// const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

type HandleErrorArgs = WithT & { err: unknown };
function handleError({ $t, err }: HandleErrorArgs) {
	console.error(err);
	zodCustomErrorMap(err);
	sqliteCustomErrorMap({ $t, err });
	throw error(500, { message: $t('error.internal-server-error') });
}

export const DELETE = async ({ params, cookies }) => {
	const { $t } = await i18n(cookies);
	const id = parseInt(params.id, 10);
	await exists({ table: 'Department', id, $t });

	try {
		const [r] = await db.deleteFrom('Department').where('id', '=', id).execute();
		return json({ suceded: r.numDeletedRows > 0 });
	} catch (err) {
		handleError({ $t, err });
	}
};

const hexColorRegex = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
const departmentSchema = z.object({
	name: z.string().min(1).max(100),
	color: z.string().refine((color) => hexColorRegex.test(color))
});

export const PUT = async ({ params, request, cookies }) => {
	console.dir(request, { depth: null });

	const { $t } = await i18n(cookies);
	const id = parseInt(params.id, 10);
	await exists({ table: 'Department', id, $t });

	try {
		const body = departmentSchema.parse(await request.json());
		const [r] = await db.updateTable('Department').set(body).where('id', '=', id).execute();
		return json({ suceded: r.numUpdatedRows > 0 });
	} catch (err) {
		handleError({ $t, err });
	}
};
