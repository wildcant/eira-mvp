-- Active: 1689640441161@@127.0.0.1@5432

-- Active: 1689640441161@@127.0.0.1@5432

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