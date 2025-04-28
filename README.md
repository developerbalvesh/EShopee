# EShopee - Online Shopping Web Application

EShopee is a full-stack online shopping web application built with a React frontend and a Node.js/Express backend. Customers can browse products, add them to their cart, and complete purchases. Administrators have tools to manage products, categories, and orders.

## Live Demo

Explore the live application hosted on Render:

[https://eshopee.onrender.com/](https://eshopee.onrender.com/)

**Please note:** As the application is hosted on Render's free tier, it might take a few moments to load initially due to server spin-up.

## Features

* **Product Catalog:** Browse products by category with detailed descriptions and images.
* **Product Filtering and Sorting:** Filter products by category and sort by price, name, etc.
* **Search Functionality:** Easily find products using keywords.
* **Shopping Cart:** Add, remove, and manage items in the shopping cart.
* **User Authentication:** Secure user registration and login.
* **Order Placement:** Seamless checkout process with payment integration.
* **Admin Dashboard:**
    * Manage products (CRUD operations).
    * Manage product categories (CRUD operations).
    * View and manage customer orders.
* **Payment Integration:** Secure payment gateway integration (likely using Braintree based on dependencies).
* **Responsive Design:** User interface adapts to various screen sizes for optimal viewing on different devices.

## Technologies Used

### Backend

* **Node.js:** JavaScript runtime environment for the server-side logic.
* **Express:** Minimalist web application framework for Node.js.
* **Mongoose:** MongoDB object modeling tool for Node.js.
* **jsonwebtoken:** For creating and verifying JSON Web Tokens for authentication.
* **bcryptjs:** For securely hashing user passwords.
* **braintree:** Likely used for processing online payments.
* **cors:** Middleware to enable Cross-Origin Resource Sharing.
* **dotenv:** To load environment variables from a `.env` file.
* **morgan:** HTTP request logger middleware.
* **nodemon:** Utility that automatically restarts the server upon file changes.
* **slugify:** To generate URL-friendly slugs from strings (e.g., product names).
* **concurrently:** To run multiple npm scripts concurrently (for development).
* **express-formidable:** Middleware for handling form data, especially file uploads.
* **colors:** For adding color to console output.
* **serve:** Simple HTTP server for serving static content.

### Frontend (`backend/client`)

* **React:** JavaScript library for building the user interface.
* **React Router DOM:** For managing navigation within the single-page application.
* **Axios:** Promise-based HTTP client for making API requests to the backend.
* **Ant Design (antd):** A UI library providing a set of high-quality React components.
* **React Hot Toast:** For displaying user-friendly notifications.
* **React Icons:** Library of popular icon sets for React.
* **React Helmet:** For managing the document head (title, meta tags).
* **Moment:** JavaScript library for working with dates and times.
* **Animate.css:** Library of CSS animations.
* **react-animate-on-scroll:** React component to trigger animations on scroll.
* **braintree-web-drop-in-react:** React components for Braintree's payment UI.
* **react-select:** Customizable select input component for React.
* **react-select-search:** Another select search component for React.
* **react-toastify:** Library for displaying toast notifications.
* **react-scripts:** Set of scripts and configurations used by Create React App.
* **serve:** Simple HTTP server for serving static content.

## Getting Started

To run this project locally, follow these steps:

### Prerequisites

* **Node.js** (version >= 18)
* **npm** (usually comes with Node.js) or **yarn**
* **MongoDB** installed and running

### Backend Setup

1.  Navigate to the root directory of the project:
    ```bash
    cd eshopee-project
    ```
2.  Install backend dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```
3.  Create a `.env` file in the root directory and configure your environment variables (e.g., MongoDB connection URI, JWT secret, Braintree API keys). Refer to any `.env.example` file if provided.
4.  Start the backend server:
    ```bash
    npm run server
    # or
    yarn server
    ```
    The backend server should now be running on the specified port (likely 8080 based on the frontend `proxy` setting).

### Frontend Setup

1.  Navigate to the `client` directory within the `backend` folder:
    ```bash
    cd backend/client
    ```
2.  Install frontend dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```
3.  Start the frontend development server:
    ```bash
    npm start
    # or
    yarn start
    ```
    The frontend application should now be running in your browser, usually at `http://localhost:3000` (as configured by `react-scripts`). The `proxy` setting in the frontend configuration will forward API requests to `http://localhost:8080`.

### Running Both Concurrently (Development)

From the root directory, you can run both the frontend and backend development servers simultaneously using the `dev` script:

```bash
npm run dev
# or
yarn dev
