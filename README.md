ShoeCart Retail Management System

SmartMart is a full-stack MERN (MongoDB, Express.js, React, Node.js) application designed to help small retail stores manage inventory, sales, and daily operations efficiently. The system provides a simple UI, fast backend, and clear analytics for better decision-making.


Features

Inventory Management
	•	Add, update, delete products
	•	Category-based organization
	•	Low-stock indication
	•	Real-time stock updates


Dashboard
	•	Total products, categories, size, description
	•	Total amount
	• Order summary


Tech Stack
Frontend: React, Axios, React Router
Backend: Node.js, Express.js, MongoDB, Mongoose



Installation: 

Backend

cd backend
npm install
npm start

Frontend

cd frontend
npm install
npm start


API Endpoints

Products
	•	GET /api/products
	•	POST /api/products
	•	PUT /api/products/:id
	•	DELETE /api/products/:id


Project Flow
	1.	User interacts with React frontend
	2.	Frontend hits backend APIs via Axios
	3.	Express handles requests and communicates with MongoDB
	4.	MongoDB returns data through Mongoose
	5.	UI updates dynamically


