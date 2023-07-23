import { db } from '$lib/database';
import { exists, sqliteCustomErrorMap } from '$lib/database/utils.js';
import { error, json } from '@sveltejs/kit';

export const DELETE = async ({ params }) => {
	const id = parseInt(params.id, 10);
	await exists('Department', id);

	try {
		const [r] = await db.deleteFrom('Department').where('id', '=', id).execute();
		return json({ suceded: r.numDeletedRows > 0 });
	} catch (err) {
		console.error(err);
		sqliteCustomErrorMap(err);
		throw error(500);
	}
};

export const PUT = async ({ params, request }) => {
	const id = parseInt(params.id, 10);
	await exists('Department', id);

	// TODO: parse body.
	const body = await request.json();

	try {
		const [r] = await db.updateTable('Department').set(body).where('id', '=', id).execute();
		return json({ suceded: r.numUpdatedRows > 0 });
	} catch (err) {
		console.error(err);
		sqliteCustomErrorMap(err);
		throw error(500);
	}
};
