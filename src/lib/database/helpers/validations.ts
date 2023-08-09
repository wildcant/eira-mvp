import { db } from '$lib/database';
import type { WithT } from '$lib/i18n/api';
import { error } from '@sveltejs/kit';
import type { DB } from 'kysely-codegen';
import { z } from 'zod';

type ExistsArgs = WithT & { table: keyof DB; id: number };
export async function exists({ $t, table, id }: ExistsArgs) {
	const record = await db.selectFrom(table).select('id').where('id', '=', id).execute();
	if (!record) throw error(404, `${$t(`tables.${table}`)} ${$t('error.not-found')}`);
}

const ALLOWED_RELATIONSHIPS = [
	'departments',
	'categories',
	'companies',
	'subcategories',
	'users',
	'images'
] as const;
const relationships = z.enum(ALLOWED_RELATIONSHIPS);
export type Relationship = z.infer<typeof relationships>;
type ValidateRelationShipArgs = WithT & {
	allowedRelationships: Relationship[];
	include: string[] | undefined;
};
const INVALID_INCLUDE = 'INVALID_INCLUDE';
export function validateRelationship({
	$t,
	include,
	allowedRelationships
}: ValidateRelationShipArgs): Relationship[] | undefined {
	if (!include) return;
	let relations: Relationship[] | undefined = undefined;
	try {
		allowedRelationships.forEach((r) => relationships.parse(r));

		if (!include.every((i) => allowedRelationships.includes(i as Relationship))) {
			throw new Error(INVALID_INCLUDE);
		}

		relations = include.map((i) => relationships.parse(i));
	} catch (err) {
		console.error(err);
		if (err instanceof Error && err.message === INVALID_INCLUDE) {
			const allowed = allowedRelationships.map((v) => `"${v}"`).join(', ');
			throw error(400, $t('error.invalid-include-param', { include: include.join(', '), allowed }));
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
