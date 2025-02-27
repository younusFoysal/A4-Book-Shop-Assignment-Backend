<h1 align="center">Book Shop Server </h1>

Live Server: [Book-Shop-Server](https://bookhubserver.vercel.app/)


## Project Overview
Book Shop B4A2V1 is an Express.js application built with TypeScript, MongoDB,
and Mongoose for managing a book store. It provides comprehensive CRUD operations for books
and order management while ensuring data integrity through Mongoose schema validation.
The application includes advanced features like inventory management, revenue calculation,
and error handling, making it a robust and scalable solution for
managing a book shop's backend services.

## Features

- Add, update, delete, and retrieve books with detailed attributes like title, author, price, category, and stock status.
- Search books by title, author, or category.
- Place orders with customer details, book selection, and quantity.
- Automatically manage inventory and handle out-of-stock scenarios.
- Use MongoDB aggregation to compute total revenue from all orders.
- Enforce schema validation for book attributes and ensure data integrity.
- Return detailed error responses for better debugging and user feedback.

## Technologies Used
```
node
cors
dotenv
express
mongoose
ts-node-dev
typescript
```

## How to Run Locally
1. Clone the repository: `git clone https://github.com/younusFoysal/A4-Book-Shop-Assignment-Backend.git`
2. Navigate to the project directory: `cd A4-Book-Shop-Assignment-Backend`
3. Install dependencies: `npm install`
4. Set up environment variables as per `.env`.
5. Start the server: `npm run start:dev`