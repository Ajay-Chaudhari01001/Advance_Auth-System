# Advanced Authentication System - Signup Route

Welcome to the **Advanced Authentication System**! This document provides a detailed overview of the **Signup Route** functionality, including its purpose, flow, and how to utilize the provided utility files to ensure a secure and scalable user signup process.

---

## 📋 **Project Structure Overview**

```bash
project-folder
│
├── controllers
│   └── auth.controller.js
│
├── models
│   └── user.model.js
│
├── utils
│   ├── hashPassword.js
│   ├── generateVerificationToken.js
│   ├── generateTokenAndSetCookie.js
│   └── validateUser.js
│
└── index.js
```

### **Key Files and Their Responsibilities:**
- **auth.controller.js**: Handles the signup, login, and logout routes.
- **user.model.js**: Defines the MongoDB schema for users.
- **utils**: Contains utility functions to keep the codebase clean and reusable.

---

## 🚀 **Signup Route Overview**

The **Signup Route** allows users to create a new account by providing their **name**, **email**, and **password**. The route handles:
- Input validation using **Joi**
- Password hashing using **bcrypt**
- Generating a **verification token**
- Setting a **JWT token** in cookies for authentication

---

## 📄 **Signup Route Workflow**

### **Endpoint**: `/api/auth/signup`
- **Method**: `POST`
- **Description**: Handles user registration by validating input, hashing the password, creating a user in the database, and setting a token in the response cookie.

---

## 🛠️ **Utility Functions Overview**

### ✅ **1. hashPassword.js**
- **Purpose**: Hashes the user's password using bcrypt before storing it in the database.
- **How it Works**: Takes a plain text password and hashes it with a salt round of 10 to ensure secure password storage.

### ✅ **2. generateVerificationToken.js**
- **Purpose**: Generates a 6-digit verification token for email verification and sets an expiration time.
- **How it Works**: Creates a random 6-digit number and sets it to expire after 24 hours.

### ✅ **3. validateUser.js**
- **Purpose**: Validates the user's input (name, email, password) using Joi to ensure that the input data meets the required standards.
- **How it Works**: Uses a predefined Joi schema to check if the input fields are valid, returning error messages if any field is incorrect.

### ✅ **4. generateTokenAndSetCookie.js**
- **Purpose**: Generates a JWT token and sets it in the user's cookies for authentication purposes.
- **How it Works**: Signs a JWT with the user ID, sets the token to expire in 7 days, and stores it as an HTTP-only cookie for security.

---

## ✅ **Environment Variables**
Make sure you have a `.env` file with the following environment variables:

- **JWT_SECRET**: Your secret key for signing JWT tokens.
- **NODE_ENV**: The environment mode (e.g., development or production).

Example:
```
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

---

## 🧪 **Testing the Signup Route**

Use a tool like **Postman** to test the **Signup Route**.

### **Example Request:**
- **POST** `/api/auth/signup`
- **Body**:
```json
{
    "name": "Ajay Chaudhari",
    "email": "ajay@example.com",
    "password": "password123"
}
```

### **Expected Response:**
```json
{
    "success": true,
    "message": "User created successfully",
    "user": {
        "id": "64abc1234def567890",
        "name": "Ajay Chaudhari",
        "email": "ajay@example.com"
    }
}
```

---




