### Steps to create the database

```sh
# Create local db.
sqlite3 src/lib/database/local.db < src/lib/database/schema.sql
# Seed local db
sqlite3 src/lib/database/local.db < src/lib/database/seed-es.sql

# Create remote db.
turso db destroy eira
# Restore remote db with local db.
turso db create eira --from-file src/lib/database/local.db

# Generate token and replace DATABASE_AUTH_TOKEN env var so libsql client can connect properly.
turso db tokens create eira --expiration none
```

### Tips

- Create a database with a SQLite database file

  ```sh
  turso db create $DB_NAME --from-file $DB_FILE
  ```

- Create a long-lived token with no expiration with

  ```sh
  turso db tokens create $DB_NAME --expiration none
  ```

- Destroy an entire logical database
  ```sh
  turso db destroy $DB_NAME
  ```

### References

- [About migrations](https://blog.turso.tech/database-migrations-made-easy-with-atlas-df2b259862db
- [Good read about cursor pagination](https://brunoscheufler.com/blog/2022-01-01-paginating-large-ordered-datasets-with-cursor-based-pagination)
- [https://www.fda.gov/media/84201/download](Structured Product Labeling)
