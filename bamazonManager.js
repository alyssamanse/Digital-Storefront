var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "am1432",
  database: "bamazon"
});

connection.connect(function(error) {
  if (error) throw error;
  start();
});

function start() {
	inquirer.prompt([
	    {
	    	name: "menuOptions", 
	    	type: "rawlist",
	    	message: "What would you like to do?",
	    	choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
	    }
	]).then(function(response) {

		switch(response.menuOptions) {
			case "View Products for Sale":
			return viewProducts();
			case "View Low Inventory":
			return lowInventory();
			case "Add to Inventory":
			return addToInventory();
			case "Add New Product":
			return addProduct();
		}
	})
}

function viewProducts() {
	connection.query("SELECT * from products", function(error, result) {
        if (error) {
        	return console.log(error);
        }
        console.log("\n-----------------------------");
        result.forEach(function(product) {
        	console.log(product.item_id + " | " + product.product_name + " | " + product.price);
        });
        console.log("-----------------------------\n");

        start();
    });
}

function lowInventory() {
	connection.query("SELECT * from products", function(error, result) {
        if (error) throw erorr;

        console.log("\nLow Inventory");
        console.log("-----------------------------");

        result.forEach(function(product) {
        	if (product.stock_quantity <= 5) {
        		console.log(product.product_name + " | " + product.stock_quantity);
        	}
        });

        console.log("-----------------------------\n");

        start();
    });
}

function addToInventory() {

	connection.query("SELECT * from products", function(error, result) {
        if (error) throw erorr;

        console.log("\n Add to Inventory");
        console.log("-----------------------------");

        result.forEach(function(product) {
        	console.log(product.item_id + " | " + product.product_name + " | " + product.stock_quantity);
        });

        console.log("-----------------------------\n");

        inquirer.prompt([
		    {
		    	name: "item_id", 
		    	message: "Enter the ID of the product you'd like to add inventory for"
		    }, 
		    {
		    	name: "quantity", 
		    	message: "How many units would you like to add to inventory?"
		    }
		]).then(function(response) {
	    	var item;

	    	for (var i = 0; i < result.length; i++) {
	    		if (result[i].item_id === parseInt(response.item_id)) {
	    			item = result[i];
	    		}
	    	}

	    	var quantity = parseInt(response.quantity);
	    	var newQuantity = parseInt(quantity + item.stock_quantity);

	    	connection.query("UPDATE products SET ? WHERE ?", 
	    		[
		    		{
		    			stock_quantity: newQuantity	
		    		},
		    		{
		    			item_id: item.item_id
		    		}
	    		]
    		), 
    		function(error) {
    			if (error) {
    				return console.log(error);
    			}
    		}

    		console.log("\nInventory updated successfully! The new quantity for " + item.product_name + " is " + newQuantity + "\n");
            start();
		})
	})
}

function addProduct() {
	console.log("\nAdd New Product");
	console.log("-------------------------");

    inquirer.prompt([
	    {
	    	name: "product_name", 
	    	message: "Product Name: "
	    }, 
	    {
	    	name: "department_name", 
	    	message: "Department Name: "
	    }, 
	    {
	    	name: "price", 
	    	message: "Price: "
	    }, 
	    {
	    	name: "stock_quantity", 
	    	message: "Stock Quantity: "
	    }
	]).then(function(response) {
  
    	connection.query("INSERT INTO products SET ?", 
    		{
    			product_name: response.product_name,
    			department_name: response.department_name,
    			price: parseInt(response.price),
    			stock_quantity: parseInt(response.stock_quantity)
    		}, 
			function(error, result) {
				if (error) {
					return console.log(error);
				}

				console.log("\nNew product successfully added!\n");
	        	start();
		})
	})
}