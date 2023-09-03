import { samples } from '$lib/demos/samples';
import { json } from '@sveltejs/kit';

const PAGE_SIZE = 10;
export const GET = ({ url }) => {
	const pageParam = url.searchParams.get('page');
	let page = 1;
	if (pageParam) page = parseInt(pageParam, 10);
	const pageIndex = page - 1;
	return json({
		total: samples.length,
		data: samples.slice(pageIndex * PAGE_SIZE, pageIndex * PAGE_SIZE + PAGE_SIZE)
	});
};
