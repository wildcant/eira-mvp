/* eslint-disable @typescript-eslint/no-explicit-any */
// Source: https://github.com/jlarmstrongiv/kysely/blob/dff26eefe4923b4a14fa4d48f409bd438b2de6ee/src/helpers/sqlite.ts
// Temporal while waiting for next kysely release.
import {
	type Expression,
	AliasNode,
	ColumnNode,
	IdentifierNode,
	ReferenceNode,
	type SelectQueryNode,
	type SelectQueryBuilder,
	type RawBuilder,
	type Simplify,
	sql
} from 'kysely';

/**
 * A SQLite helper for aggregating a subquery into a JSON array.
 *
 * NOTE: This helper is only guaranteed to fully work with the built-in `SqliteDialect` and `ParseJSONResultsPlugin`.
 * While the produced SQL is compatible with many databases, SQLite needs the `ParseJSONResultsPlugin` to automatically parse the results.
 *
 * ### Examples
 *
 * Installing the plugin:
 *
 * ```ts
 * db = db.withPlugin(new ParseJSONResultsPlugin())
 * ```
 *
 * Writing the query:
 *
 * ```ts
 * const result = await db
 *   .selectFrom('person')
 *   .select((eb) => [
 *     'id',
 *     jsonArrayFrom(
 *       eb.selectFrom('pet')
 *         .select(['pet.id as pet_id', 'pet.name'])
 *         .where('pet.owner_id', '=', 'person.id')
 *         .orderBy('pet.name')
 *     ).as('pets')
 *   ])
 *   .execute()
 *
 * result[0].id
 * result[0].pets[0].pet_id
 * result[0].pets[0].name
 * ```
 *
 * The generated SQL (SQLite):
 *
 * ```sql
 * select "id", (
 *   select coalesce(json_group_array(json_object(
 *     'pet_id', "agg"."pet_id",
 *     'name', "agg"."name"
 *   )), '[]') from (
 *     select "pet"."id" as "pet_id", "pet"."name"
 *     from "pet"
 *     where "pet"."owner_id" = "person"."id"
 *     order by "pet"."name"
 *   ) as "agg"
 * ) as "pets"
 * from "person"
 * ```
 */
export function jsonArrayFrom<O>(expr: SelectQueryBuilder<any, any, O>): RawBuilder<Simplify<O>[]> {
	return sql`(select coalesce(json_group_array(json_object(${sql.join(
		getJsonObjectArgs(expr.toOperationNode(), 'agg')
	)})), '[]') from ${expr} as agg)`;
}

/**
 * A SQLite helper for turning a subquery into a JSON object.
 *
 * The subquery must only return one row.
 *
 * NOTE: This helper is only guaranteed to fully work with the built-in `SqliteDialect` and `ParseJSONResultsPlugin`.
 * While the produced SQL is compatible with many databases, SQLite needs the `ParseJSONResultsPlugin` to automatically parse the results.
 *
 * ### Examples
 *
 * Installing the plugin:
 *
 * ```ts
 * db = db.withPlugin(new ParseJSONResultsPlugin())
 * ```
 *
 * Writing the query:
 *
 * ```ts
 * const result = await db
 *   .selectFrom('person')
 *   .select((eb) => [
 *     'id',
 *     jsonObjectFrom(
 *       eb.selectFrom('pet')
 *         .select(['pet.id as pet_id', 'pet.name'])
 *         .where('pet.owner_id', '=', 'person.id')
 *         .where('pet.is_favorite', '=', true)
 *     ).as('favorite_pet')
 *   ])
 *   .execute()
 *
 * result[0].id
 * result[0].favorite_pet.pet_id
 * result[0].favorite_pet.name
 * ```
 *
 * The generated SQL (SQLite):
 *
 * ```sql
 * select "id", (
 *   select json_object(
 *     'pet_id', "obj"."pet_id",
 *     'name', "obj"."name"
 *   ) from (
 *     select "pet"."id" as "pet_id", "pet"."name"
 *     from "pet"
 *     where "pet"."owner_id" = "person"."id"
 *     and "pet"."is_favorite" = ?
 *   ) as obj
 * ) as "favorite_pet"
 * from "person";
 * ```
 */
export function jsonObjectFrom<O>(
	expr: SelectQueryBuilder<any, any, O>
): RawBuilder<Simplify<O> | null> {
	return sql`(select json_object(${sql.join(
		getJsonObjectArgs(expr.toOperationNode(), 'obj')
	)}) from ${expr} as obj)`;
}

/**
 * The SQLite `json_object` function.
 *
 * NOTE: This helper is only guaranteed to fully work with the built-in `SqliteDialect` and `ParseJSONResultsPlugin`.
 * While the produced SQL is compatible with many databases, SQLite needs the `ParseJSONResultsPlugin` to automatically parse the results.
 *
 * ### Examples
 *
 * Installing the plugin:
 *
 * ```ts
 * db = db.withPlugin(new ParseJSONResultsPlugin())
 * ```
 *
 * Writing the query:
 *
 * ```ts
 * const result = await db
 *   .selectFrom('person')
 *   .select((eb) => [
 *     'id',
 *     jsonBuildObject({
 *       first: eb.ref('first_name'),
 *       last: eb.ref('last_name'),
 *       full: eb.fn('concat', ['first_name', eb.val(' '), 'last_name'])
 *     }).as('name')
 *   ])
 *   .execute()
 *
 * result[0].id
 * result[0].name.first
 * result[0].name.last
 * result[0].name.full
 * ```
 *
 * The generated SQL (SQLite):
 *
 * ```sql
 * select "id", json_object(
 *   'first', first_name,
 *   'last', last_name,
 *   'full', "first_name" || ' ' || "last_name"
 * ) as "name"
 * from "person"
 * ```
 */
export function jsonBuildObject<O extends Record<string, Expression<unknown>>>(
	obj: O
): RawBuilder<
	Simplify<{
		[K in keyof O]: O[K] extends Expression<infer V> ? V : never;
	}>
> {
	return sql`json_object(${sql.join(Object.keys(obj).flatMap((k) => [sql.lit(k), obj[k]]))})`;
}

function getJsonObjectArgs(node: SelectQueryNode, table: string): RawBuilder<unknown>[] {
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	return node.selections!.flatMap(({ selection: s }) => {
		if (ReferenceNode.is(s) && ColumnNode.is(s.column)) {
			return [sql.lit(s.column.column.name), sql.id(table, s.column.column.name)];
		} else if (ColumnNode.is(s)) {
			return [sql.lit(s.column.name), sql.id(table, s.column.name)];
		} else if (AliasNode.is(s) && IdentifierNode.is(s.alias)) {
			return [sql.lit(s.alias.name), sql.id(table, s.alias.name)];
		} else {
			throw new Error(
				'SQLite jsonArrayFrom and jsonObjectFrom functions can only handle explicit selections due to limitations of the json_object function. selectAll() is not allowed in the subquery.'
			);
		}
	});
}
