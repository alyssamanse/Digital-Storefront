DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INT auto_increment NOT NULL,
    product_name VARCHAR(100),
    department_name VARCHAR(100),
    price DECIMAL (10,2),
    stock_quantity INT,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
("Shampoo", "Beauty", 15.00, 50), 
("Conditioner", "Beauty", 12.00, 25), 
("Paper Towels", "Household", 5.50, 25), 
("Topo Chico", "Beverages", 1.75, 200), 
("Apples", "Produce", 0.50, 100), 
("Yogurt", "Dairy", 2.00, 45), 
("Sugar", "Baking", 3.00, 25), 
("Dog Food", "Pet", 18.00, 20), 
("Cheese", "Dairy", 3.50, 15), 
("Bananas", "Produce", 0.30, 250);

SELECT * from products;