import { db } from '$lib/database';
import type { WithT } from '$lib/i18n/api';
import { error } from '@sveltejs/kit';
import type { DB } from 'kysely-codegen';
import { z } from 'zod';

/** When returning is passed this function will return the db record.*/
export async function exists<T extends keyof DB = keyof DB>(
	args: WithT & { table: T; id: number; returning?: undefined }
): Promise<void>;
export async function exists<T extends keyof DB = keyof DB>(
	args: WithT & { table: T; id: number; returning: true }
): Promise<DB[T]>;
export async function exists<T extends keyof DB = keyof DB>({
	$t,
	table,
	id,
	returning
}: WithT & { table: keyof DB; id: number; returning?: undefined | true }): Promise<void | DB[T]> {
	let query = db.selectFrom(table);
	query = returning ? query.selectAll() : query.select('id');
	const [record] = await query.where('id', '=', id).execute();
	if (!record) throw error(404, $t('error.not-found'));
	if (!returning) return;
	return record as DB[T];
}

const ALLOWED_RELATIONSHIPS = [
	'departments',
	'categories',
	'companies',
	'subcategories',
	'users',
	'images',
	'attributes',
	'values',
	'products'
] as const;
export const relationships = z.enum(ALLOWED_RELATIONSHIPS);

export type Relationship = z.infer<typeof relationships>;
type ValidateRelationShipArgs = WithT & {
	allowedRelationships: Relationship[];
	include: string | null;
};
const INVALID_INCLUDE = 'INVALID_INCLUDE';
export function validateRelationship({
	$t,
	include,
	allowedRelationships
}: ValidateRelationShipArgs): Relationship[] | undefined {
	if (!include) return;
	const includeList = include.split(',');
	let relations: Relationship[] | undefined = undefined;
	try {
		allowedRelationships.forEach((r) => relationships.parse(r));

		if (!includeList.every((i) => allowedRelationships.includes(i as Relationship))) {
			throw new Error(INVALID_INCLUDE);
		}

		relations = includeList.map((i) => relationships.parse(i));
	} catch (err) {
		console.error(err);
		if (err instanceof Error && err.message === INVALID_INCLUDE) {
			const allowed = allowedRelationships.map((v) => `"${v}"`).join(', ');
			throw error(
				400,
				$t('error.invalid-include-param', { include: includeList.join(', '), allowed })
			);
		}
		throw error(500, $t('error.internal-server-error'));
	}
	return relations;
}

/*

export const relationshipToTable: { [key in Relationship]: keyof DB } = {
	departments: 'Department',
	categories: 'Category',
	companies: 'Company',
	subcategories: 'SubCategory',
	users: 'User'
};
*/

/*
// @See  https://github.com/colinhacks/zod/blob/master/ERROR_HANDLING.md#customizing-errors-with-zoderrormap
const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  if (issue.code === z.ZodIssueCode.invalid_type) {
    if (issue.expected === "string") {
      return { message: "bad type!" };
    }
  }
  if (issue.code === z.ZodIssueCode.custom) {
    return { message: `less-than-${(issue.params || {}).minimum}` };
  }
  return { message: ctx.defaultError };
};

z.setErrorMap(customErrorMap);
*/
