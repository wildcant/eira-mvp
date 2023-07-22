import type { Selectable } from 'kysely';
import type { DB } from 'kysely-codegen';

export type DatabaseTypes = {
	[K in keyof DB]: Selectable<DB[K]>;
};
