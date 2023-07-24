import { db } from '$lib/database';
import { exists, sqliteCustomErrorMap, zodCustomErrorMap } from '$lib/database/utils.js';
import { error, json } from '@sveltejs/kit';
import { z } from 'zod';

// const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function handleError(err: unknown) {
	console.error(err);
	zodCustomErrorMap(err);
	sqliteCustomErrorMap(err);
	throw error(500, { message: 'Internal server error' });
}

export const DELETE = async ({ params }) => {
	const id = parseInt(params.id, 10);
	await exists('Department', id);

	try {
		const [r] = await db.deleteFrom('Department').where('id', '=', id).execute();
		return json({ suceded: r.numDeletedRows > 0 });
	} catch (err) {
		handleError(err);
	}
};

const hexColorRegex = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
const departmentSchema = z.object({
	name: z.string().min(1).max(100),
	color: z.string().refine((color) => hexColorRegex.test(color))
});

export const PUT = async ({ params, request }) => {
	const id = parseInt(params.id, 10);
	await exists('Department', id);

	try {
		const body = departmentSchema.parse(await request.json());
		const [r] = await db.updateTable('Department').set(body).where('id', '=', id).execute();
		return json({ suceded: r.numUpdatedRows > 0 });
	} catch (err) {
		handleError(err);
	}
};
