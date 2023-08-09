import { db } from '$lib/database';
import { getDimensions } from '$lib/helpers/image-size/index.js';
import { upload } from '$lib/helpers/s3';
import { fail, json } from '@sveltejs/kit';

export const POST = async ({ request }) => {
	const form = await request.formData();
	const file = form.get('file') as File;
	const description = (form.get('description') as string) ?? '';

	if (!file) {
		throw fail(422);
	}

	const ext = file.name.split('.').at(1) as 'jpg' | 'png';
	const name = `${Date.now()}.${ext}`;
	const data = await file.arrayBuffer();
	const { width, height } = getDimensions(data, ext);

	const { url } = await upload(name, file);

	const [{ id }] = await db
		.insertInto('Image')
		.values({ url, width, height, description })
		.returning('id')
		.execute();

	return json({ imageId: id, url });
};
