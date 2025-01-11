<<<<<<< HEAD
# Advanced Authentication System 

Welcome to the **Advanced Authentication System**! This document provides a detailed overview of the **Signup** and **Verify Email Routes** functionality, including their purpose, flow, and how to utilize the provided utility files to ensure a secure and scalable user authentication process.

---

## 🚀 **Signup Route Overview**

The **Signup Route** allows users to create a new account by providing their **name**, **email**, and **password**. The route handles:
- Input validation using **Joi**
- Password hashing using **bcrypt**
- Generating a **verification token**
- Setting a **JWT token** in cookies for authentication

### **Endpoint**: `/api/auth/signup`
- **Method**: `POST`
- **Description**: Handles user registration by validating input, hashing the password, creating a user in the database, and setting a token in the response cookie.

---

## ✅ **Verify Email Route Overview**

The **Verify Email Route** allows users to verify their email address using a **6-digit verification token** that was generated during signup. This step is crucial for account activation and security.

### **Endpoint**: `/api/auth/verify-email`
- **Method**: `POST`
- **Description**: Handles email verification by accepting a verification token and updating the user's account status to verified if the token is valid.

### **Verify Email Route Workflow**
1. User receives a **6-digit verification token** via email after successful signup.
2. The user submits the token to the **Verify Email Route**.
3. The system validates the token and updates the user's account status to **verified**.
4. If the token is invalid or expired, an appropriate error message is returned.

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

## 🧪 **Testing the Signup and Verify Email Routes**

Use a tool like **Postman** to test the **Signup** and **Verify Email** routes.

### **Signup Route Example Request:**
- **POST** `/api/auth/signup`
- **Body**:
```json
{
    "name": "Ajay Chaudhari",
    "email": "ajay@example.com",
    "password": "password123"
}
```

### **Expected Signup Response:**
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

### **Verify Email Route Example Request:**
- **POST** `/api/auth/verify-email`
- **Body**:
```json
{
    "email": "ajay@example.com",
    "token": "123456"
}
```

### **Expected Verify Email Response:**
```json
{
    "success": true,
    "message": "Email verified successfully"
}
```
=======

>>>>>>> 5f24ea48b0fa3dbb659242a66bd0e3165920cc29
