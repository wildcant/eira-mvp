import { db } from '$lib/database';
import type { DatabaseTypes } from '$lib/database/types';
import { i18n, type WithT } from '$lib/i18n/api';
import type { PaginatedApiResponse } from '$lib/types';
import { error, json } from '@sveltejs/kit';
import { z } from 'zod';

function encode(str: string) {
	return Buffer.from(str).toString('base64');
}
function decode(str: string) {
	return Buffer.from(str, 'base64').toString();
}

type ParseCursorPaginationArgs = WithT & { url: URL };
function parseCursorPagination({ url, $t }: ParseCursorPaginationArgs) {
	const afterParam = url.searchParams.get('after');
	const beforeParam = url.searchParams.get('before');
	const sizeParam = url.searchParams.get('size');
	if (beforeParam && afterParam)
		throw error(400, { message: $t('error.pagination.range-pagination') });

	let size;
	try {
		size = z.coerce
			.number()
			.optional()
			.refine((val) => (val ? Number.isInteger(val) && val > 0 : true), {
				message: `${$t('error.pagination.size')} ${size}`
			})
			.parse(sizeParam);
	} catch (err) {
		if (err instanceof z.ZodError) {
			throw error(400, { message: err.format()._errors[0] });
		}
	}

	let before;
	if (beforeParam) {
		try {
			before = parseInt(decode(beforeParam), 10);
			if (Number.isNaN(before) || !Number.isInteger(before)) throw new Error();
		} catch (err) {
			throw error(400, { message: $t('error.pagination.invalid-before-cursor') });
		}
	}

	let after;
	if (afterParam) {
		try {
			after = parseInt(decode(afterParam), 10);
			if (Number.isNaN(after) || !Number.isInteger(after)) throw new Error();
		} catch (err) {
			throw error(400, { message: $t('error.pagination.invalid-after-cursor') });
		}
	}

	return { after, before, size };
}

const DEFAULT_LIMIT = 20;
export const GET = async ({ url, cookies }) => {
	const { $t } = await i18n(cookies);
	const search = url.searchParams.get('search');
	const { after, before, size } = parseCursorPagination({ $t, url });

	const baseQuery = db.selectFrom('Department').orderBy('Department.id', before ? 'desc' : 'asc');

	let query = baseQuery.selectAll();
	if (search) query = query.where('Department.name', 'like', `%${search}%`);

	if (after) query = query.where('Department.id', '>', after);

	if (before) query = query.where('Department.id', '<', before);

	const limit = !size ? DEFAULT_LIMIT : size;

	// We sum 1 to check if the the following page is empty (`hasMore` flag)
	if (limit) query = query.limit(limit + 1);

	const [[{ count }], data] = await Promise.all([
		baseQuery.select((eb) => eb.fn.countAll().as('count')).execute(),
		query.execute()
	]);

	if (data.length === 0) {
		return json({
			data: [],
			meta: {
				beforeCursor: null,
				afterCursor: null,
				hasMore: false,
				total: 0
			}
		} satisfies PaginatedApiResponse<DatabaseTypes['Department']>);
	}

	const hasMore = data.length > limit;
	// now that we know if there are more records to be fetch we can remove that last element we added.
	if (hasMore) data.pop();

	let afterCursor: string | null = null;
	let beforeCursor: string | null = null;

	if (!after && before) {
		data.reverse();
	}

	if (before || hasMore) {
		afterCursor = encode(data[data.length - 1].id.toString());
	}

	if (after || (hasMore && before)) {
		beforeCursor = encode(data[0].id.toString());
	}

	const response = {
		data,
		meta: {
			beforeCursor,
			afterCursor,
			hasMore,
			total: parseInt(count.toString(), 10)
		}
	} satisfies PaginatedApiResponse<DatabaseTypes['Department']>;

	return json(response);
};

// TODO: Complete department creation endpoint.
export const POST = async () => {
	return json({ succeed: true });
};
