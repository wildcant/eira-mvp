export type PaginatedApiResponse<T> = {
	data: T[];
	meta: {
		afterCursor: string | undefined;
		beforeCursor: string | undefined;
		hasMore: boolean;
		total: number;
	};
};
