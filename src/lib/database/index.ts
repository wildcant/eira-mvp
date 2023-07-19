import { NODE_ENV } from '$env/static/private';
import { LibsqlDialect } from '@libsql/kysely-libsql';
import SQLite from 'better-sqlite3';
import { Kysely, SqliteDialect } from 'kysely';
import type { DB } from 'kysely-codegen';
import path from 'path';

let singleton: Kysely<DB> | undefined;
if (!singleton) {
	singleton =
		NODE_ENV === 'production'
			? new Kysely<DB>({
					dialect: new LibsqlDialect({
						url: 'libsql://localhost:8080?tls=0'
					})
			  })
			: new Kysely<DB>({
					dialect: new SqliteDialect({
						database: new SQLite(path.resolve('./src/lib/database/local.db'), {
							fileMustExist: true
						})
					})
			  });
}

export const db = singleton;
