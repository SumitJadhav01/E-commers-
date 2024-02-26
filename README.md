# Project Title: Ecommerce API with Node.js

# Description:
This project involves building a robust API set to support e-commerce operations, including product and category listing, product details, cart management, order processing, user registration.
The API is developed using Node.js and integrated with a SQL database, preferably Mysql, to manage product/category data, user cart information, and order details.

Requirements:

# API Endpoints:

Category Listing: Retrieve a list of categories.
Product Listing: Retrieve a list of products with essential details such as title, price, description, and availability, based on category ID.
Product Details: Fetch detailed information of a specific product by its ID.
Cart Management: Allow users to add products to their cart, view the cart, update quantities, and remove items from the cart.
Order Placement: Handle order placement, allowing users to place an order with products from their cart.
Order History: Fetch the order history for authenticated users.
Order Details: Retrieve detailed information of a specific order by its ID.
User Registration and Login: Implement a set of APIs to register and login users.

# Database Integration:

Utilize any SQL database, preferably Mysql, to manage product/category data, user cart information, and order details.
Ensure seamless interaction between the API and the database to opration on products, cart items, and orders.
Error Handling:

Implement appropriate error handling mechanisms to ensure the API returns meaningful error messages and status codes when necessary.
Handle validation errors, database errors, and other potential issues to enhance the reliability of the API.
 
# Installation:

Clone the repository: git clone https://github.com/SumitJadhav01/E-commers-.git
Install dependencies: npm install
Configure environment variables for database connection.
Usage:

Start the server: nodemon app.js 
Run on : http://localhost:8080/Category
Access API endpoints using appropriate HTTP methods and endpoints.



# API Endpoint Documentation

Category Listing

Endpoint: /categories
Method: GET
Functionality: Retrieves a list of categories.
Expected Input: None
Output:
HTTP Status Code: 200 OK
Response Body: Array of category objects containing id, name .


Product Listing

Endpoint: products/:id
Method: GET
Functionality: Retrieves a list of products based on category ID.
Expected Input:
Query Parameter: categoryId (required) - ID of the category for which products are to be listed.
Output:
HTTP Status Code: 200 OK
Response Body: Array of product objects containing id, title, price, description, availability, etc.

Product Details

Endpoint: /ProductDetails/:id
Method: GET
Functionality: Fetches detailed information of a specific product by its ID.
Expected Input:
Path Parameter: productId (required) - ID of the product to fetch details for.
Output:
HTTP Status Code: 200 OK
Response Body: Detailed product object including title, price, description, availability, etc.


Cart Management

Endpoint: /cart
Method:
GET: Retrieves the user's cart.
POST: Adds a product to the user's cart.
DELETE: Removes a product from the user's cart.
Functionality: Allows users to manage their cart, including adding and removing items.
Expected Input:
POST: Product ID and quantity to add to the cart.
DELETE: Product ID to remove from the cart.
Output:
HTTP Status Code: 200 OK for successful operations.
Response Body: Deleted cart object.


Order Placement

Endpoint: /product/:id/buynow
Method: POST
Functionality: Handles order placement, allowing users to place an order with products from their cart.
Expected Input:
Cart items and user details to place the order.
Output:
HTTP Status Code: 200 OK
Response Body: Order confirmation with details such as order ID, items, total amount, etc.


Order History

Endpoint: /orderhistory
Method: GET
Functionality: Fetches the order history for  users.
Method: DELETE
Functionality: remove the order history for  users.
Expected Input: product ID
Output:
HTTP Status Code: 200 OK
Response Body: Array of order objects containing details such as order ID, items, total amount, etc.

Endpoint: /register
Method: POST
Functionality: Registers a new user in the system.
Expected Input: User details including username, email, and password.
Output:
HTTP Status Code: 200 OK
Response Body: Success message or user object.
User Login

Endpoint: /login
Method: POST
Functionality: Allows registered users to log in to the system.
Expected Input: User credentials (email/username and password).
Output:
HTTP Status Code: 200 OK
Response Body: Authentication token or success message.
Rate Li

# Contributing:
Fork the repository, make changes, and submit a pull request.
Report issues or suggest improvements by opening an issue.
 

# Acknowledgments:

Special thanks to Triveous for providing the assignment opportunity.
 
