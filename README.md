# Varun Furniture

Welcome to the **Varun Furniture** project! This is a full-stack web application designed for a furniture shop, built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Project Structure

This repository is divided into two main parts:

- **`backend/`**: The Node.js/Express server that handles the API, database connection (MongoDB), authentication, and other server-side logic.
- **`frontend/`**: The React application built with Vite, providing the user interface for customers to browse and purchase furniture.

## Features

### Backend
- **Express.js API**: RESTful API endpoints.
- **MongoDB & Mongoose**: Database for storing products, users, and orders.
- **Authentication**: JWT-based authentication and `bcryptjs` for password hashing.
- **File Uploads**: `multer` for handling product image uploads.
- **Real-time**: `socket.io` for real-time features.
- **Email**: `nodemailer` for email notifications.

### Frontend
- **React & Vite**: Fast development and optimized build process.
- **Styling & UI**: Bootstrap, React Icons, and Framer Motion for animations.
- **Routing**: React Router DOM for seamless navigation.
- **State & Data Fetching**: Axios for API calls.
- **Carousels**: React Slick for image sliders.

## Getting Started

To run this project locally, you will need to start both the backend and the frontend servers.

### Prerequisites

- Node.js installed on your machine
- MongoDB instance (local or Atlas)

### 1. Backend Setup

1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the `backend` directory.
   - Add the necessary variables (e.g., `PORT`, `MONGO_URI`, `JWT_SECRET`).
4. Start the backend development server:
   ```bash
   npm run dev
   ```

### 2. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the `frontend` directory if required by your API URL configuration.
4. Start the frontend development server:
   ```bash
   npm run dev
   ```

## License

This project is licensed under the ISC License.
