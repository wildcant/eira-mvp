// Source: https://github.com/kysely-org/kysely/blob/master/src/plugin/parse-json-results/parse-json-results-plugin.ts
// Temporal while waiting for next kysely release.
import type {
	KyselyPlugin,
	PluginTransformQueryArgs,
	PluginTransformResultArgs,
	QueryResult,
	RootOperationNode,
	UnknownRow
} from 'kysely';
import isPlainObject from 'lodash/isPlainObject';
import isString from 'lodash/isString';

/**
 * Parses JSON strings in query results into JSON objects.
 *
 * This plugin can be useful with dialects that don't automatically parse
 * JSON into objects and arrays but return JSON strings instead.
 *
 * ```ts
 * const db = new Kysely<DB>({
 *   ...
 *   plugins: [new ParseJSONResultsPlugin()]
 * })
 * ```
 */
export class ParseJSONResultsPlugin implements KyselyPlugin {
	// noop
	transformQuery(args: PluginTransformQueryArgs): RootOperationNode {
		return args.node;
	}

	async transformResult(args: PluginTransformResultArgs): Promise<QueryResult<UnknownRow>> {
		return {
			...args.result,
			rows: parseArray(args.result.rows)
		};
	}
}

function parseArray<T>(arr: T[]): T[] {
	for (let i = 0; i < arr.length; ++i) {
		arr[i] = parse(arr[i]) as T;
	}

	return arr;
}

function parse(obj: unknown): unknown {
	if (isString(obj)) {
		return parseString(obj);
	}

	if (Array.isArray(obj)) {
		return parseArray(obj);
	}

	if (isPlainObject(obj)) {
		return parseObject(obj as Record<string, unknown>);
	}

	return obj;
}

function parseString(str: string): unknown {
	if (maybeJson(str)) {
		try {
			return parse(JSON.parse(str));
		} catch (err) {
			// this catch block is intentionally empty.
		}
	}

	return str;
}

function maybeJson(value: string): boolean {
	// eslint-disable-next-line no-useless-escape
	return value.match(/^[\[\{]/) != null;
}

function parseObject(obj: Record<string, unknown>): Record<string, unknown> {
	for (const key in obj) {
		obj[key] = parse(obj[key]);
	}

	return obj;
}
