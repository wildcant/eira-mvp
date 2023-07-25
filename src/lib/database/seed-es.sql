INSERT INTO
    Department (name, color)
VALUES (
        'Salud y medicamentos',
        '#FF0000'
    );

INSERT INTO
    "Category" (name, departmentId)
VALUES ('Salud y medicamentos', 1), ('Tratamiento de la gripa', 1);

INSERT INTO
    "SubCategory" (name, categoryId)
VALUES ('Droguería', 1), ('Dolor de garganta', 2);