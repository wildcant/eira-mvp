import { db } from '$lib/database';
import type { WithT } from '$lib/i18n/api';
import { error } from '@sveltejs/kit';
import type { DB } from 'kysely-codegen';

type ExistsArgs = WithT & { table: keyof DB; id: number };
export async function exists({ $t, table, id }: ExistsArgs) {
	const record = await db.selectFrom(table).select('id').where('id', '=', id).execute();
	if (!record) throw error(404, `${$t(`tables.${table}`)} ${$t('error.not-found')}`);
}

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
