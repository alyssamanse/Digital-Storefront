var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
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
	connection.query("select * from products", function(error, result) {
        if (error) throw erorr;

        console.log("\nCurrent Inventory");
        console.log("-----------------------------");
        result.forEach(function(product) {
        	console.log(product.item_id + " | " + product.product_name + " | $" + product.price);
        })
        console.log("-----------------------------\n");

        inquirer.prompt([
		    {
		    	name: "item_id", 
		    	message: "Enter the ID of the product you'd like to buy.."
		    }, 
		    {
		    	name: "quantity", 
		    	message: "How many units would you like to buy?"
		    }
		]).then(function(response) {
	    	var item;
	    	var quantity = parseInt(response.quantity);

	    	for (var i = 0; i < result.length; i++) {
	    		if (result[i].item_id === parseInt(response.item_id)) {
	    			item = result[i];
	    		}
	    	}

	    	connection.query("select * from products where item_id = ?", [item.item_id], function(error) {
	 
	    		if (item.stock_quantity > quantity) {
	    			connection.query("update products set ? where ?", 
	    				[
	    					{
	    						stock_quantity: (item.stock_quantity - quantity)
	    					}, 
	    					{
	    						item_id: item.item_id
	    					}
						]
					);

					console.log("\n--------------------------");
					console.log("You've successfully purchased " + quantity + " x " + item.product_name);
					console.log("Your total is $" + (quantity * item.price));
					console.log("--------------------------\n");

					inquirer.prompt({
						name: "confirm",
						type: "confirm", 
						message: "Do you want to shop again?"
					}).then(function(answer) {
						if (answer.confirm) {
							start();
						} else {
							return;
						}
					})
	    		} else {
	    			console.log("\nSorry, the available stock is " + item.stock_quantity + "\n");

	    			inquirer.prompt({
	    				name: "confirm",
	    				type: "confirm", 
	    				message: "Do you want to shop again?"
	    			}).then(function(answer) {
	    				if (answer.confirm) {
	    					start();
	    				} else {
	    					return;
	    				}
	    			})
	    		}
	    	})
    	})
    })
}