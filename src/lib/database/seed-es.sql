INSERT INTO
    Department (name, color)
VALUES
    ('Salud y medicamentos', '#84D24C'),
    ('Belleza', '#B14497'),
    ('Cuidado del bebé', '#14C5C7'),
    ('Cuidado personal', '#63428F'),
    ('Alimentos y bebidas', '#418FDE'),
    ('Hogar, mascotas y otros.', '#41de63');

INSERT INTO
    Category (name, departmentId)
VALUES
    ('Alivio del dolor', 1),
    ('Botiquín y primeros auxilios', 1),
    ('Cuidado de la vista', 1),
    ('Cuidado de los pies y antimicóticos', 1),
    ('Dermatológicos', 1),
    ('Droguería', 1),
    ('Incontinencia', 1),
    ('Nutrición y vida saludable', 1),
    ('Rehabilitación y equipos médicos', 1),
    ('Salud digestiva', 1),
    ('Salud y medicamentos', 1),
    ('Tratamiento de la gripa', 1),
    ('Vitaminas y productos naturales', 1),
    ('Accesorios de belleza', 2),
    ('Cosméticos', 2),
    ('Cuidado de la piel', 2),
    ('Dermocosmeticos', 2),
    ('Fragancias', 2),
    ('Compotas y cereales', 3),
    ('Fórmulas infantiles', 3),
    ('Higiene del bebé', 3),
    ('Pañales y pañitos húmedos', 3),
    ('Bienestar sexual', 4),
    ('Cuidado bucal', 4),
    ('Cuidado de la piel', 4),
    ('Cuidado del cabello', 4),
    ('Dermocosmética', 4),
    ('Higiene personal', 4),
    ('Aguas, gaesosas, jugos, tés y energizantes', 5),
    ('Alimentos saludables', 5),
    ('Alimentos, panes, quesos y huevos', 5),
    ('Bebidas alcohólicas', 5),
    ('Dulces, chocolates, galletas, tortas y helados', 5),
    ('Leches, avenas y yogurts', 5),
    ('Snacks salados y pasabocas', 5),
    ('Acc. del hogar, ferreteria y cuidado de zapatos', 6),
    ('Higiene del hogar', 6),
    ('Mascotas', 6),
    ('Otros', 6),
    ('Vasos, platos, envases, cocina y picnic', 6);

INSERT INTO
    SubCategory (name, categoryId)
VALUES
	('Dolor general', 1),
	('Dolor fuerte', 1),
	('Dolor abdominal y cólico', 1),
	('Muscular y articular', 1),
	('Niños', 1),
	('Tratamiento de varices', 1),
	('Curitas, algodones, adhesivos y botiquín', 2),
	('Antisépticos', 2),
	('Compresas', 2),
	('Vendas', 2),
	('Jeringas, guantes y material hosp.', 2),
	('Aparatos médicos y pastilleros', 2),
	('Solución para lentes de contacto', 3),
	('Gotas, lubricantes y lágrimas artificiales', 3),
	('Gafas de sol', 3),
	('Gafas de lectura', 3),
	('Lentes de contacto', 3),
	('Talcos y desodorantes de pie', 4),
	('Antimicótico', 4),
	('Plantillas', 4),
	('Apósitos y tratamiento de callos', 4),
	('Accesorios para pies', 4),
	('Refrescantes y humectantes de pies', 4),
	('Antiprurignoso', 4),
	('Antiprurignoso', 5),
	('Antimicótico tópico', 5),
	('Protectores dérmicos', 5),
	('Tratamiento de cicatrices y heridas', 5),
	('Tratamiento de psoriasis', 5),
	('Queratolíticos', 5),
	('Tratamiento de alopecia', 5),
	('Pañales incontinencia', 7),
	('Otros', 7),
	('Alimentos saludables', 8),
	('Artículos deportivos', 8),
	('Nutrición', 8),
	('Pastilleros y dosificadores', 8),
	('Vendas', 9),
	('Calcetines y medias terapeúticas', 9),
	('Equipos médicos', 9),
	('Accesorios deportivos', 9),
	('Productos para rehabilitación', 9),
	('Compresas', 9),
	('Antiácidos y antiulcerosos', 10),
	('Digestivos', 10),
	('Antidiarréicos y sueros', 10),
	('Laxantes y fibras', 10),
	('Antiflatulentos', 10),
	('Productos para el mareo', 10),
	('Droguería', 11),
	('Resfriado y gripa', 12),
	('Dolor de garganta', 12),
	('Tratamiento de la tos', 12),
	('Descongestionante', 12),
	('Niños', 12),
	('Vitaminas', 13),
	('Multivitamínicos', 13),
	('Naturales', 13),
	('Minerales', 13),
	('Ojos', 14),
	('Rostro y cuerpo', 14),
	('Uñas', 14),
	('Estuches y kits', 14),
	('Ojos', 15),
	('Labios', 15),
	('Bases y polvos', 15),
	('Uñas', 15),
	('Lociones y siliconas', 15),
	('Cuidado solar', 16),
	('Cuidado corporal', 16),
	('Cuidado facial', 16),
	('Cuidado Corporal', 17),
	('Cuidado Capilar', 17),
	('Cuidado Facial', 17),
	('Maquillaje', 17),
	('Proteccion Solar', 17),
	('Fragancias', 18),
	('Compotas', 19),
	('Cereales', 19),
	('Orgánicos', 19),
	('Galletas, papillas y yogurts', 19),
	('Crecimiento', 20),
	('Prematuros', 20),
	('Seguimiento', 20),
	('Especializadas', 20),
	('Shampoo', 21),
	('Jabones', 21),
	('Acondicionadores', 21),
	('Fragancias y colonias', 21),
	('Cremas', 21),
	('Aceites', 21),
	('Talcos', 21),
	('Accesorios de bebé', 21),
	('Copitos', 21),
	('Pañales', 22),
	('Toallitas y pañitos húmedos', 22),
	('Preservativos', 23),
	('Lubricantes', 23),
	('Higiene Íntima', 23),
	('Cremas dentales', 24),
	('Cepillos dentales', 24),
	('Enjuagues dentales', 24),
	('Seda dental', 24),
	('Especializados', 24),
	('Cuidado solar', 25),
	('Cuidado corporal', 25),
	('Cuidado facial', 25),
	('Repelentes e insecticidas', 25),
	('Shampoo ', 26),
	('Acondicionador', 26),
	('Cremas, geles y lociones', 26),
	('Ampollas', 26),
	('Tintes para cabello', 26),
	('Lociones y siliconas', 26),
	('Desrizadores', 26),
	('Spray', 26),
	('Baños de crema', 26),
	('Accesorios cabello', 26),
	('Capilar', 27),
	('Corporal', 27),
	('Facial', 27),
	('Proteccion solar', 27),
	('Maquillaje', 27),
	('Jabones', 28),
	('Desodorantes y antitranspirantes', 28),
	('Depilación y afeitado', 28),
	('Protección femenina', 28),
	('Incontinencia', 28),
	('Aguas', 29),
	('Gaseosas', 29),
	('Jugos', 29),
	('Tés', 29),
	('Energizantes', 29),
	('Alimentos', 30),
	('Snacks dulces', 30),
	('Snacks salados', 30),
	('Endulzantes', 30),
	('Panes', 31),
	('Huevos, pastas y harinas', 31),
	('Lácteos', 31),
	('Quesos y charcutería', 31),
	('Café y té', 31),
	('Cereales', 31),
	('Ensaladas, sanduches y frutas', 31),
	('Sopas, salsas y aderezos', 31),
	('Atunes', 31),
	('Cervezas', 32),
	('Vinos', 32),
	('Bebidas alcohólicas', 32),
	('Chocolates', 33),
	('Helados y postres', 33),
	('Galletas', 33),
	('Dulces, chupetas y caramelos', 33),
	('Tortas y ponqués', 33),
	('Granolas', 33),
	('Cereales', 33),
	('Gomas', 33),
	('Chicles y mentas', 33),
	('Leches y bebidas lácteas', 34),
	('Yogurt', 34),
	('Avenas', 34),
	('Lácteos saborizados', 34),
	('Snacks y pasabocas', 35),
	('Maníes y frutos secos', 35),
	('Granolas', 35),
	('Accesorios del hogar', 36),
	('Cuidado de los zapatos', 36),
	('Ferrereria y otros', 36),
	('Papel higiénico', 37),
	('Servilletas, secantes y pañuelos', 37),
	('Repelentes e insecticidas', 37),
	('Detergentes y jabones', 37),
	('Lavaplatos', 37),
	('Ambientadores', 37),
	('Desinfectantes y acc. de limpieza', 37),
	('Alimentos', 38),
	('Salud e Higiene', 38),
	('Accesorios', 38),
	('Baterías', 39),
	('Decoración', 39),
	('Diversión', 39),
	('Libros', 39),
	('Medias', 39),
	('Tecnología', 39),
	('Textiles', 39),
	('Viajero', 39),
	('Cocina y picnic', 40),
	('Envases y contenedores', 40),
	('Papeles envolventes', 40),
	('Platos', 40),
	('Vasos', 40),
	('Navidad', 40);

INSERT INTO 
		ProductAttribute (name, unitOfMeasure)
VALUES
	('masa', 'mg'),
	('volumen', 'ml'),
	('unidades', 'x'),
	('restricción de edad', 'años'),
	('forma farmacéutica', ''),
	('presentación', ''),
	('sabor', '');


INSERT INTO 
		ProductAttributeValue (productAttributeId, name)
VALUES
	(1, '500'),
	(2, '60'),
	(2, '120'),
	(3, '4'),
	(3, '8'),
	(3, '10'),
	(3, '12'),
	(3, '14'),
	(3, '16'),
	(3, '20'),
	(3, '24'),
	(3, '28'),
	(3, '48'),
	(3, '200'),
	(4, '2'),
	(5, 'Tabletas'),
	(5, 'Cápsulas'),
	(6, 'Frasco'),
	(6, 'Caja'),
	(6, 'Fracción'),
	(7, 'Frambuesa'),
	(7, 'Naranja');


insert into
    Tax (name, scope, type, amount)
values
	('Impuesto de venta 19%', 'sales', 'percentage', 19),
	('Impuesto de compra 6%', 'purchases', 'percentage', 6);

insert into
    Product (name, departmentId, categoryId, subCategoryId)
values
	('Dolex Forte', 1, 12, 52),
	('Drops Vick', 1, 12, 52),
	('Mieltertos', 1, 12, 52),
	('Strepsils Intensive', 1, 12, 52),
	('Vick Mentol', 1, 12, 52),
	('Mebucaína Forte', 1, 12, 52),
	('Noraver Garganta', 1, 12, 52),
	('Bucoxol Garganta', 1, 12, 52),
	('Benzirin', 1, 12, 52),
	('Isodine Bucofaríngeo', 1, 12, 52),
	('Bucoxol Tri', 1, 12, 52),
	('Cetirizina', 1, 12, 52);

insert into
    Product (name, departmentId, categoryId)
values
	('Nimesulida Colmed', 1, 6),
	('Tranexam', 1, 6),
	('Tranexam', 1, 6),
	('Cefalexina Genfar', 1, 6),
	('Neurobion', 1, 6),
	('Sildenafil', 1, 6),
	('Pyralvex', 1, 6),
	('Desloratadina Genfar', 1, 6),
	('Sildenafil Genfar', 1, 6),
	('Fluconazol MK', 1, 6),
	('Diclofenaco MK', 1, 6);


insert into
    ProductAttributeList (productId, productAttributeId)
values
	(1, 1),
	(1, 6),
	(1, 5),
	(1, 3);

INSERT INTO 
		ProductAttributeValueList (productAttributeListId, productAttributeValueId)
VALUES
	(1, 1),
	(2, 19),
	(2, 20),
	(3, 16),
	(3, 17),
	(4, 5),
	(4, 8),
	(4, 12),
	(4, 13);

insert into 
  ProductVariant (productId, price, averageCost, cost, sku, barcode, stock)
values
  (1, 200, 50, 100, "MED-G123-GUC", "72345678999992", 20);


insert into 
  ProductVariantAttribute (variantId, attributeId, attributeValueId)
values
  (1, 12, 52),
  (1, 6, 19),
  (1, 5, 16),
  (1, 3, 12);
