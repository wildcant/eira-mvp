export type Prettify<T> = {
	[K in keyof T]: T[K];
} & {};

export type PaginatedApiResponse<T> = {
	data: T[];
	meta: {
		afterCursor: string | undefined;
		beforeCursor: string | undefined;
		hasMore: boolean;
		total: number;
	};
};
