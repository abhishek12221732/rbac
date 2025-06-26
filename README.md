# **Full-Stack RBAC Blog Platform**

This is a complete full-stack blog platform demonstrating Role-Based Access Control (RBAC) using the MERN stack (MongoDB, Express.js, React/Next.js, Node.js) and JWT for authentication.

The application has two primary roles:

* **User**: Can sign up, log in, and view all blog posts.  
* **Admin**: Has all user permissions, plus the ability to create, edit, and delete blog posts via a protected admin dashboard.

### [**Live Demo →**](https://rbac-yta0.onrender.com/)

https://rbac-yta0.onrender.com/

*(use Admin Signup Code: “admin123”)*

## **Features**

* **Role-Based Access Control (RBAC)**: Distinct permissions for user and admin roles.  
* **JWT Authentication**: Secure, token-based authentication flow.  
* **Full-Stack Implementation**: Separate, communicating frontend and backend applications.  
* **Admin Dashboard**: A protected route for admins to manage all blog content (Create, Read, Update, Delete \- CRUD).  
* **Secret Admin Signup**: A secure method for creating new admin accounts using a secret code.  
* **Modern Frontend**: Built with Next.js (App Router) and styled with Tailwind CSS for a clean, responsive UI.  
* **RESTful API**: A well-structured backend API built with Node.js and Express.

## **Tech Stack**

| Category | Technology |
| :---- | :---- |
| **Frontend** | **[Next.js](https://nextjs.org/)** (React Framework), [**Tailwind CSS**](https://tailwindcss.com/), [**axios**](https://axios-http.com/) |
| **Backend** | **[Node.js](https://nodejs.org/)**, [**Express.js**](https://expressjs.com/) |
| **Database** | **[MongoDB](https://www.mongodb.com/)** with [**Mongoose**](https://mongoosejs.com/) |
| **Auth** | **[JSON Web Tokens (JWT)](https://jwt.io/)**, [**bcrypt.js**](https://www.npmjs.com/package/bcryptjs) |

## **Getting Started**

Follow these instructions to get the project running on your local machine.

### **Prerequisites**

* [Node.js](https://nodejs.org/en/) (v18.x or later)  
* [MongoDB](https://www.mongodb.com/try/download/community) or a MongoDB Atlas account (for the connection string).  
* npm or yarn package manager.

### **1\. Backend Setup**

First, navigate to the backend directory to set up the server.

\# Navigate to the backend folder  
cd backend

\# Install dependencies  
npm install

Next, create a .env file in the backend root directory and add the following environment variables.

**backend/.env**

PORT=5001  
MONGO\_URI=your\_mongodb\_connection\_string  
JWT\_SECRET=your\_long\_and\_secret\_jwt\_key  
ADMIN\_SIGNUP\_CODE=your\_secret\_admin\_code

* MONGO\_URI: Your MongoDB connection string.  
* JWT\_SECRET: A long, random string for securing tokens.  
* ADMIN\_SIGNUP\_CODE: A secret code that will be used on the frontend to register new admins.

Now, you can run the backend server:

\# Run the server in development mode (with nodemon)  
npm run dev

The backend API will be running at http://localhost:5001.

### **2\. Frontend Setup**

In a new terminal, navigate to the frontend directory.

\# Navigate to the frontend folder  
cd frontend

\# Install dependencies  
npm install

Next, create a .env.local file in the frontend root directory. This file will point to your backend API.

**frontend/.env.local**

NEXT\_PUBLIC\_API\_URL=http://localhost:5001/api

Now, you can run the frontend development server:

\# Run the Next.js development server  
npm run dev

The frontend application will be available at http://localhost:3000.

## **How to Login as an Admin**

There is one primary way to create an admin account:

#### **Admin Signup with a Secret Code**

1. Navigate to the **Sign Up** page on the application (http://localhost:3000/signup).  
2. Fill in your Name, Email, and Password.  
3. Check the **"Sign up as an Admin"** checkbox.  
4. An "Admin Code" input field will appear.  
5. Enter the secret code that you defined as ADMIN\_SIGNUP\_CODE in the backend .env file.  
6. Click **"Create Account"**.

If the code is correct, your account will be created with the admin role. You can then log in with these credentials to access the Admin Dashboard.

## **How It Works**

The application's security and role-based access are centered around a few key concepts:

1. **JWT Authentication**: When a user logs in or signs up, the Express backend generates a JSON Web Token (JWT). This token, which contains the user's ID and role, is sent to the Next.js frontend.  
2. **Token Storage**: The frontend stores this JWT in localStorage. For every subsequent request to a protected API route, the token is attached to the Authorization header.  
3. **Backend Middleware**: The Express backend uses middleware to protect its routes.  
   * The verifyToken middleware checks for a valid JWT on incoming requests. If the token is valid, it decodes it and attaches the user's data to the request object (req.user).  
   * The isAdmin middleware checks if req.user.role is equal to 'admin'. This middleware is applied to routes that should only be accessible to administrators (e.g., creating, updating, or deleting posts).  
4. **Frontend Route Protection**: The Next.js frontend protects pages and components by using a global AuthContext.  
   * For protected pages like /posts and /admin/dashboard, a useEffect hook checks if a user is authenticated and has the correct role.  
   * If the user does not meet the requirements, they are redirected to the login page with a notification.

This dual protection—on both the frontend (for UI/UX) and backend (for true security)—ensures that the application is robust and that data and actions are properly restricted based on user roles.