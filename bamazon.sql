DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price VARCHAR(45) NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPad 9.7-Inch", "Computers", 378.98, 5), ("Microsoft Surface Pro", "Computers", 1045.90, 9), ("The Outsider", "Books", 17.79, 18), ("Those Meddling Kids", "Books", 15.10, 13), ("Keurig K575", "Kitchen", 179.99, 25), ("Oster Toaster Oven", "Kitchen", 59.99, 32), ("Star Wars The Last Jedi DVD", "Entertainment", 17.99, 80), ("IT DVD", "Entertainment", 10.40, 30), ("Men's Nike Flex 2017 RN Running Shoe", "Shoes", 77.84, 12), ("Converse All Star Low, Charcoal", "Shoes", 49.99, 8);

SELECT*FROM products;



-- ### Alternative way to insert more than one row
-- INSERT INTO products (flavor, price, quantity)
-- VALUES ("vanilla", 2.50, 100), ("chocolate", 3.10, 120), ("strawberry", 3.25, 75);
