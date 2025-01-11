// Utility to generate a JWT token and set it as a cookie in the response
// This is used to authenticate users after they sign up or log in
import jwt from 'jsonwebtoken';

/**
 * @function generateTokenAndSetCookie
 * @description Generates a JWT token and sets it in the user's cookies for authentication.
 * @param {object} res - The response object to set the cookie.
 * @param {string} userId - The ID of the user for whom the token is generated.
 */
export const generateTokenAndSetCookie = (res, userId) => {
    // Generate a JWT token with the user's ID as the payload
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '7d', // Token expires in 7 days
    });

    // Set the token in the response cookies
    res.cookie('token', token, {
        httpOnly: true, // Prevents client-side access to the cookie
        secure: process.env.NODE_ENV === 'production', // Ensures secure cookie in production
        maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expires in 7 days
    });
};
