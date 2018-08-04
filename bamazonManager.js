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
  menu();
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
   // addWhat()
   menu();
  });
}

function readProductsAdd() {
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
    addWhat()
  // menu();
  });
}

function menu(){
  inquirer.prompt([{
        type: "checkbox",
        name: "choice1",
        message: "What would you like to do?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
  }]).then(function(answers){
    if (answers.choice1 == "View Products for Sale"){
      readProducts();        
    }
    else if(answers.choice1 == "View Low Inventory"){
      connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, res) {
        for (var i = 0; i < res.length; i++) {
          var lowInventory = 
          "Item # " + res[i].item_id+' '+
          "Product: " + res[i].product_name+' '+
          "Department: " + res[i].department_name+' '+
          "Price: $ "+ res[i].price+' '+
          "Available Stock: " + res[i].stock_quantity;
          console.log(lowInventory + "\r\n");
          menu();
        }
      });  
    }
    else if(answers.choice1 == "Add to Inventory"){
     readProductsAdd();
    }
    else if(answers.choice1 == "Add New Product"){
      createProduct();
     }
  })
}

function addWhat(res){
  
  inquirer.prompt([{
    type: "input",
    name: "item_id",
    message: "What is the ID number of the product you want to add more of?"
	},
	{
		type: "input",
		name: "units",
    message: "How many units of the product would you like to add?"
  }]).then(function(answers){
    var buyId = parseInt(answers.item_id);
    var buyUnits = parseInt(answers.units);
    connection.query("UPDATE products SET stock_quantity = stock_quantity + " + buyUnits + " WHERE item_id = " + buyId, function(err, res) {
      console.log("Inventory Updated");
      readProducts();
  })
  })
}

function createProduct() {
  inquirer.prompt([{
    type: "input",
    name: "product_name",
    message: "What is the product name you want add?"
  },
  {
    type: "input",
    name: "department_name",
    message: "What is the department the product belongs to?"
  },
  {
    type: "input",
    name: "price",
    message: "What is the price of the product?"
  },
  {
    type: "input",
    name: "stock_quantity",
    message: "How much of this product is in stock?"
  }]).then(function(answers){
    var queryStr = 'INSERT INTO products SET ?';
    connection.query(queryStr, answers, function (err, answers) {
      if (err) throw err;
        readProducts();
    }
  )
  }) 
}
