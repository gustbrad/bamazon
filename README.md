# Bamazon Assignment

## Summary
This was an assignment that required the use of Node.js and MySQL to create an Amazon like store front. I have two parts to my assignment.
* bamazonCustomer.js
* bamazonManager.js

## bamazonCustomer.js 
The bamazonCustomer.js displays the items currently available in the store and then asks the user if they would like to place an order. Should the user say no, the app will thank the user for their business and stop. Sjould the user say yes, the app asks the user what is the ID number of the product they would like to buy. The user will then enter the ID number and the app then asks how many of the item the user would like to buy. If there is not enough of the item the app returns with "Unfortunately your order could not be completed due to insufficient inventory. Please try again." Then starts over. If there is enough of the item then the app returns with "The order has been processed!
The total cost of this order is $XX.XX
Inventory Updated".

![no purchase](/images/1.png)
!(/images/2.png)
!(/images/3.png)

## bamazonManager.js
The bamazonManager.js presents the user with 4 options.
* View Products for sale
* View Low Inventory
* Add to Inventory
* Add New Product

### View Products for Sale
    If the user selects this option then all of the available items in the store are displayed and the user is presented with the menu of options again.
    !(/images/4.png)

### View Low Inventory
    If the user selects this option then all of the items in the store that are fewer than 5 in stock are displayed and the user is presented with the menu of options again.
    !(/images/5.png)

### Add to Inventory
    If the user chooses this option then they are asked what is the ID number of the item they want to add more of. Then they are asked how much they would like to add. The inventory is updated and the items available are displayed followed by the menu.
    !(/images/6.png)

### Add New Product
    If the user chooses this option then they are asked what is the name of the product they would like to add.
    Then they are asked what department the item belongs to.Then they are asked what is the price of the item. Finally how many of the item they are adding. The item is added, the items are displayed and the menu is displayed.
    !(/images/7.png)

