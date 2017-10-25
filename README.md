# Bamazon: Digital Storefront

## Description
This CLI application creates an Amazon-like storefront using MySql. The app will take in orders from customers and deplete stock from the store's inventory. The app also provides a manager view with options to create products and add to the inventory. 

***

## Customer Application
Running this application will first display all of the items available for sale and then prompt the user for which product and how many units they would like to purchase. Once the customer has made a selection, their purchase request will be checked against the current inventory.


![Customer View Demo](https://user-images.githubusercontent.com/27502734/31977727-ce308936-b903-11e7-8225-2efb24ca9caa.gif "Customer Demo")
 
## Manager Application
Running the bamazonManager.js will display a list of menu options for the user to view products for sale, view low inventory, add to inventory or add a new product.


![Manager View Demo](https://user-images.githubusercontent.com/27502734/31977711-bc90d334-b903-11e7-939a-1c5d6af59b18.gif "Manager Demo")

***

## Setup Instructions
The JavaScript files reference a MySql database called Bamazon, hosted locally on my computer. To create a similar database on your machine, please reference the schema.sql file to see how the database was created. 

## Run CLI Instructions
1. Clone repo
2. npm install
3. node bamazon.js for customer interface
node bamazonManager.js for manager interface
