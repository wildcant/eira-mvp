import { db } from '$lib/database';
import { error, json } from '@sveltejs/kit';

export const DELETE = async ({ params }) => {
	const id = parseInt(params.id, 10);
	if (db.selectFrom('Department').where('id', '=', id)) {
		error(404, 'Department not found');
	}

	const [r] = await db.deleteFrom('Department').where('id', '=', id).execute();

	return json({ suceded: r.numDeletedRows > 0 });
};

export const PUT = async ({ params, request }) => {
	const id = parseInt(params.id, 10);
	if (db.selectFrom('Department').where('id', '=', id)) {
		error(404, 'Department not found');
	}

	// TODO: parse body.
	const body = await request.json();
	const [r] = await db.updateTable('Department').set(body).where('id', '=', id).execute();

	return json({ suceded: r.numUpdatedRows > 0 });
};
