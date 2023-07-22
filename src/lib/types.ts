export type PaginatedApiResponse<T> = {
	data: T[];
	meta: {
		afterCursor: string | null;
		beforeCursor: string | null;
		hasMore: boolean;
		total: number;
	};
};
