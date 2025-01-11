# Advanced Authentication System - Authentication Routes

Welcome to the **Advanced Authentication System**! This document provides a detailed overview of the authentication routes, including their purpose, flow, and how to utilize the provided utility files to ensure a secure and scalable user authentication process.

---

## 🚀 **Authentication Routes Overview**

This system includes the following routes for user authentication and account management:

### **Endpoints:**
- **POST** `/api/auth/signup` - User Signup
- **POST** `/api/auth/login` - User Login
- **POST** `/api/auth/logout` - User Logout
- **POST** `/api/auth/verify-email` - Email Verification
- **POST** `/api/auth/forgot-password` - Forgot Password
- **POST** `/api/auth/reset-password/:token` - Reset Password

These routes are defined in the `auth.routes.js` file, which imports the necessary controller functions and sets up the endpoints.

```javascript
import express from 'express';
import { forgotPassword, resetPassword, loginUser, logoutUser, signupUser, verifyEmail } from '../controllers/auth.controller.js';

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
```

---

## 📄 **Signup Route Workflow**

### **Endpoint**: `/api/auth/signup`
- **Method**: `POST`
- **Description**: Handles user registration by validating input, hashing the password, creating a user in the database, and setting a token in the response cookie.

---

## ✅ **Verify Email Route Overview**

### **Endpoint**: `/api/auth/verify-email`
- **Method**: `POST`
- **Description**: Handles email verification by accepting a verification token and updating the user's account status to verified if the token is valid.

---

## 🔐 **Login Route Workflow**

### **Endpoint**: `/api/auth/login`
- **Method**: `POST`
- **Description**: Authenticates the user by verifying their email and password, and sets a JWT token in the response cookie for future requests.

#### **Example Request:**
```json
{
    "email": "ajay@example.com",
    "password": "password123"
}
```

#### **Expected Response:**
```json
{
    "success": true,
    "message": "Login successfully",
    "user": {
        "id": "64abc1234def567890",
        "name": "Ajay Chaudhari",
        "email": "ajay@example.com"
    }
}
```

---

## 🚪 **Logout Route Workflow**

### **Endpoint**: `/api/auth/logout`
- **Method**: `POST`
- **Description**: Logs out the user by clearing the JWT token from the cookies.

#### **Expected Response:**
```json
{
    "success": true,
    "message": "Logout Successfully"
}
```

---

## 🔄 **Forgot Password Route Workflow**

### **Endpoint**: `/api/auth/forgot-password`
- **Method**: `POST`
- **Description**: Sends a password reset link to the user's email address if the account exists.

#### **Example Request:**
```json
{
    "email": "ajay@example.com"
}
```

#### **Expected Response:**
```json
{
    "success": true,
    "message": "Password reset link sent to your email"
}
```

---

## 🔑 **Reset Password Route Workflow**

### **Endpoint**: `/api/auth/reset-password/:token`
- **Method**: `POST`
- **Description**: Resets the user's password using a valid reset token.

#### **Example Request:**
- **POST** `/api/auth/reset-password/abcdef123456`
- **Body:**
```json
{
    "password": "newPassword123"
}
```

#### **Expected Response:**
```json
{
    "success": true,
    "message": "Password reset successful"
}
```

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