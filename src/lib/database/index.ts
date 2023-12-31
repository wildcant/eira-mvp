import { DATABASE_AUTH_TOKEN, DATABASE_URL, NODE_ENV } from '$env/static/private';
import { LibsqlDialect } from '@libsql/kysely-libsql';
import SQLite from 'better-sqlite3';
import { Kysely, ParseJSONResultsPlugin, SqliteDialect } from 'kysely';
import type { DB } from 'kysely-codegen';
import path from 'path';

let singleton: Kysely<DB> | undefined;
if (!singleton) {
	singleton =
		NODE_ENV === 'production'
			? new Kysely<DB>({
					dialect: new LibsqlDialect({
						url: DATABASE_URL,
						authToken: DATABASE_AUTH_TOKEN
					}),
					plugins: [new ParseJSONResultsPlugin()]
			  })
			: new Kysely<DB>({
					dialect: new SqliteDialect({
						database: new SQLite(path.resolve(DATABASE_URL), {
							fileMustExist: true
						})
					}),
					plugins: [new ParseJSONResultsPlugin()]
			  });
}

export const db = singleton;
