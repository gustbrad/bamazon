var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Cognus11!",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  readProducts();
});

function readProducts() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log("------------------------------------------------------------------------------------------------------------------------");
    for (var i = 0; i < res.length; i++) {
      var availableProducts = 
      "Item # " + res[i].item_id+' '+
      "Product: " + res[i].product_name+' '+
      "Department: " + res[i].department_name+' '+
      "Price: $ "+ res[i].price+' '+
      "Available Stock: " + res[i].stock_quantity;
      console.log(availableProducts);
    }
    console.log("------------------------------------------------------------------------------------------------------------------------");
    another(res);
  });
}

function buyWhat(res){
  inquirer.prompt([{
    type: "input",
    name: "item_id",
    message: "What is the ID number of the product you want to buy?"
	},
	{
		type: "input",
		name: "units",
    message: "How many units of the product would you like to buy?"
  }]).then(function(answers){
    var buyId = parseInt(answers.item_id);
    var buyUnits = parseInt(answers.units);
    if (buyUnits <= res[(buyId - 1)].stock_quantity){
      console.log("The order has been processed!")
      var updateQuery = connection.query(
        "UPDATE products SET ? WHERE ?",
        [
          {
            stock_quantity: res[(buyId-1)].stock_quantity -= buyUnits
          },
          {
            item_id: buyId
          }
        ], function(err, resTwo){            })
        console.log("The total cost of this order is $"+ ((res[(buyId-1)]).price * buyUnits));
        console.log("Inventory Updated");
        readProducts();
        
    }
  else{
    console.log("Unfortunately your order could not be completed due to insufficient inventory. Please try again.")
    readProducts();
}
})
}

function another(res){
inquirer.prompt([{
  type: "input",
  name: "again",
  message: "Would you like to create an order?(y or yes)(n or no)"
}]).then(function(answers){
if (answers.again=="yes" || answers.again=="y"){
  buyWhat(res);
}
else{
  console.log("Thanks for your business. Hope to see you again.")
  connection.end();
}
})
}
