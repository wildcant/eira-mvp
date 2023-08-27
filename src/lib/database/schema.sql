DROP TABLE IF EXISTS Department;

CREATE TABLE
    IF NOT EXISTS Department (
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        slug TEXT GENERATED ALWAYS AS (
            REPLACE (LOWER(name), ' ', '-')
        ) STORED,
        color TEXT NOT NULL UNIQUE CHECK(length(color) = 7),
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP
    );

CREATE TRIGGER DEPARTMENT_UPDATED_AT AFTER UPDATE ON 
DEPARTMENT FOR EACH ROW BEGIN 
	UPDATE Department
	SET
	    updatedAt = CURRENT_TIMESTAMP
	WHERE id = NEW.id;
END; 

DROP TABLE IF EXISTS Category;

CREATE TABLE
    IF NOT EXISTS Category (
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        departmentId INTEGER NOT NULL,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP,
        FOREIGN KEY(departmentId) REFERENCES Department(id)
    );

CREATE TRIGGER CATEGORY_UPDATED_AT AFTER UPDATE ON 
CATEGORY FOR EACH ROW BEGIN 
	UPDATE Category
	SET
	    updatedAt = CURRENT_TIMESTAMP
	WHERE id = NEW.id;
END; 

DROP TABLE IF EXISTS SubCategory;

CREATE TABLE
    IF NOT EXISTS SubCategory (
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        categoryId INTEGER NOT NULL,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP,
        FOREIGN KEY(categoryId) REFERENCES Category(id)
    );

CREATE TRIGGER SUBCATEGORY_UPDATED_AT AFTER UPDATE 
ON SUBCATEGORY FOR EACH ROW BEGIN 
	UPDATE SubCategory
	SET
	    updatedAt = CURRENT_TIMESTAMP
	WHERE id = NEW.id;
END; 

DROP TABLE IF EXISTS Product;

CREATE TABLE
    IF NOT EXISTS Product (
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        departmentId INTEGER NOT NULL,
        categoryId INTEGER NOT NULL,
        subCategoryId INTEGER,
        imageId INTEGER,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP,
        FOREIGN KEY (departmentId) REFERENCES Department(id),
        FOREIGN KEY (categoryId) REFERENCES Category(id),
        FOREIGN KEY (subCategoryId) REFERENCES SubCategory(id),
        FOREIGN KEY (imageId) REFERENCES Image(id)
    );

CREATE TRIGGER PRODUCT_UPDATED_AT AFTER UPDATE ON PRODUCT 
FOR EACH ROW BEGIN 
	UPDATE Product
	SET
	    updatedAt = CURRENT_TIMESTAMP
	WHERE id = NEW.id;
END; 

DROP TABLE IF EXISTS ProductVariant;

CREATE TABLE
    IF NOT EXISTS ProductVariant (
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        imageId INTEGER,
        productId INTEGER NOT NULL,
        price REAL NOT NULL,
        averageCost REAL NOT NULL,
        cost REAL NOT NULL,
        -- providerId INTEGER,
        sku TEXT NOT NULL,
        barcode TEXT NOT NULL,
        stock INTEGER NOT NULL,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP,
        FOREIGN KEY (imageId) REFERENCES Image(id),
        FOREIGN KEY (productId) REFERENCES Product(id)
    );

CREATE TRIGGER PRODUCTVARIANT_UPDATED_AT AFTER UPDATE 
ON PRODUCTVARIANT FOR EACH ROW BEGIN 
	UPDATE ProductVariant
	SET
	    updatedAt = CURRENT_TIMESTAMP
	WHERE id = NEW.id;
END; 

DROP TABLE IF EXISTS ProductVariantTax;

CREATE TABLE
    IF NOT EXISTS ProductVariantTax (
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        productVariantId INTEGER NOT NULL,
        taxId INTEGER NOT NULL,
        FOREIGN KEY (productVariantId) REFERENCES ProductVariant(id),
        FOREIGN KEY (taxId) REFERENCES Tax(id)
    );

DROP TABLE IF EXISTS Company;

CREATE TABLE
    IF NOT EXISTS Company (
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP
    );

CREATE TRIGGER COMPANY_UPDATED_AT AFTER UPDATE ON COMPANY 
FOR EACH ROW BEGIN 
	UPDATE Company
	SET
	    updatedAt = CURRENT_TIMESTAMP
	WHERE id = NEW.id;
END; 

DROP TABLE IF EXISTS User;

CREATE TABLE
    IF NOT EXISTS User (
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        firstName TEXT,
        lastName TEXT,
        companyId INTEGER,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP,
        FOREIGN KEY (companyId) REFERENCES Company(id)
    );

CREATE TRIGGER USER_UPDATED_AT AFTER UPDATE ON USER 
FOR EACH ROW BEGIN 
	UPDATE User
	SET
	    updatedAt = CURRENT_TIMESTAMP
	WHERE id = NEW.id;
END; 

DROP TABLE IF EXISTS ProductAttribute;

CREATE TABLE
    IF NOT EXISTS ProductAttribute (
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        unitOfMeasure TEXT,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP
    );

CREATE TRIGGER PRODUCT_ATTRIBUTE_UPDATED_AT AFTER UPDATE 
ON PRODUCTATTRIBUTE FOR EACH ROW BEGIN 
	UPDATE ProductAttribute
	SET
	    updatedAt = CURRENT_TIMESTAMP
	WHERE id = NEW.id;
END; 

DROP TABLE IF EXISTS ProductAttributeValue;

CREATE TABLE
    IF NOT EXISTS ProductAttributeValue (
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        productAttributeId INTEGER NOT NULL,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP,
        FOREIGN KEY (productAttributeId) REFERENCES ProductAttribute(id) ON DELETE CASCADE
    );

CREATE UNIQUE INDEX ProductAttributeValueUniqueValuePerAttribute ON ProductAttributeValue(name, productAttributeId);

CREATE TRIGGER PRODUCT_ATTRIBUTE_VALUE_UPDATED_AT AFTER 
UPDATE ON PRODUCTATTRIBUTEVALUE FOR EACH ROW BEGIN 
	UPDATE
	    ProductAttributeValue
	SET
	    updatedAt = CURRENT_TIMESTAMP
	WHERE id = NEW.id;
END; 

DROP TABLE IF EXISTS ProductAttributeList;

CREATE TABLE
    IF NOT EXISTS ProductAttributeList (
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        productId INTEGER NOT NULL,
        productAttributeId INTEGER NOT NULL,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP,
        FOREIGN KEY (productId) REFERENCES Product(id),
        FOREIGN KEY (productAttributeId) REFERENCES ProductAttribute(id)
    );

DROP TABLE IF EXISTS ProductAttributeValueList;

CREATE TABLE
    IF NOT EXISTS ProductAttributeValueList (
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        productAttributeListId INTEGER NOT NULL,
        productAttributeValueId INTEGER NOT NULL,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP,
        FOREIGN KEY (productAttributeListId) REFERENCES ProductAttributeList(id),
        FOREIGN KEY (productAttributeValueId) REFERENCES ProductAttributeValue(id)
    );

DROP TABLE IF EXISTS Image;

CREATE TABLE
    IF NOT EXISTS Image (
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        url TEXT NOT NULL,
        width INTEGER NOT NULL,
        height INTEGER NOT NULL,
        description TEXT,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP
    );

CREATE TRIGGER IMAGE_UPDATED_AT AFTER UPDATE ON IMAGE 
FOR EACH ROW BEGIN 
	UPDATE Image
	SET
	    updatedAt = CURRENT_TIMESTAMP
	WHERE id = NEW.id;
END; 

DROP TABLE IF EXISTS Tax;

CREATE TABLE
    IF NOT EXISTS Tax (
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        scope TEXT CHECK(scope IN ('sales', 'purchases')) NOT NULL DEFAULT 'sales',
        type TEXT CHECK(type IN ('percentage', 'fixed')) NOT NULL DEFAULT 'percentage',
        amount REAL NOT NULL,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP
    );

DROP TABLE IF EXISTS ProductVariantAttribute;

CREATE TABLE
    IF NOT EXISTS ProductVariantAttribute (
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        variantId INTEGER NOT NULL,
        attributeId INTEGER NOT NULL,
        attributeValueId INTEGER,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP,
        FOREIGN KEY (variantId) REFERENCES ProductVariant(id),
        FOREIGN KEY (attributeId) REFERENCES ProductAttribute(id),
        FOREIGN KEY (attributeValueId) REFERENCES ProductAttributeValue(id)
    );