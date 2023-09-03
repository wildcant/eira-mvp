/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { samples, type Person } from '$lib/demos/samples';
import type { PaginatedApiResponse } from '$lib/types';
import { json } from '@sveltejs/kit';

const DEFAULT_LIMIT = 10;
export const GET = async ({ url }) => {
	const search = url.searchParams.get('search');
	const after = parseInt(url.searchParams.get('after')!, 10);
	const size = parseInt(url.searchParams.get('size')!, 10);

	let data: Person[] = [...samples];
	data.sort((a, b) => a.id - b.id);
	if (search) {
		const s = search.toLowerCase();
		data = data.filter(
			(item) =>
				item.age.toString().includes(s) ||
				item.visits.toString().includes(s) ||
				item.progress.toString().includes(s) ||
				item.firstName.toLowerCase().includes(s) ||
				item.lastName.toLowerCase().includes(s) ||
				item.status.toLowerCase().includes(s)
		);
	}

	const limit = !size ? DEFAULT_LIMIT : size;
	// We sum 1 to check if the the following page is empty (`hasMore` flag)

	data = data.slice(after ? after : 0, after ? after + limit + 1 : limit + 1);

	if (data.length === 0) {
		return json({
			data: [],
			meta: {
				beforeCursor: undefined,
				afterCursor: undefined,
				hasMore: false,
				total: 0
			}
		} satisfies PaginatedApiResponse<Person>);
	}

	const hasMore = data.length > limit;

	// now that we know if there are more records to be fetch we can remove that last element we added.
	if (hasMore) data.pop();

	let afterCursor: string | undefined = undefined;

	if (hasMore) {
		afterCursor = data[data.length - 1].id.toString();
	}

	const response = {
		data,
		meta: {
			beforeCursor: undefined,
			afterCursor,
			hasMore,
			total: parseInt(data.length.toString(), 10)
		}
	} satisfies PaginatedApiResponse<Person>;

	return json(response);
};
