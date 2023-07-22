-- Active: 1689640441161@@127.0.0.1@5432

-- Active: 1689640441161@@127.0.0.1@5432

DROP TABLE IF EXISTS "Department";

CREATE TABLE
    IF NOT EXISTS Department (
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        slug TEXT GENERATED ALWAYS AS (REPLACE(LOWER(name), ' ', '-')) STORED,
        color TEXT NOT NULL UNIQUE CHECK(length(color) = 7),
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP
    );

CREATE TRIGGER UPDATE_UPDATED_AT AFTER UPDATE ON DEPARTMENT 
FOR EACH ROW BEGIN 
	UPDATE Department
	SET
	    updatedAt = CURRENT_TIMESTAMP
	WHERE id = NEW.id;
END; 

/*
 -- Examples
 
 INSERT INTO
 Department (name, color)
 VALUES (
 'Salud y medicamentos',
 '#FFF000'
 );
 UPDATE Department SET name = 'Salud y fitness' WHERE id = 2;
 */

SELECT *
FROM "Department"
WHERE
    name LIKE '%Department 1%';

CREATE TABLE
    IF NOT EXISTS Company (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        createdAt TEXT
    );

CREATE TABLE
    IF NOT EXISTS User (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT,
        lastName TEXT,
        companyId INTEGER,
        createdAt TEXT,
        FOREIGN KEY (companyId) REFERENCES Company(id)
    );