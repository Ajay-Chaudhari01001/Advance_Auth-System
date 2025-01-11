// Utility to generate a 6-digit verification token for email verification
// It also sets an expiration time for the token (24 hours)
import crypto from 'crypto';

/**
 * @function generateVerificationToken
 * @description Generates a random 6-digit token and sets its expiration time.
 * @returns {object} - An object containing the token and its expiration timestamp.
 */
export const generateVerificationToken = () => {
    // Generate a random 6-digit number as the verification token
    const token = Math.floor(100000 + Math.random() * 900000).toString();

    // Set the token to expire in 24 hours
    const expiresAt = Date.now() + 24 * 60 * 60 * 1000;

    return { token, expiresAt };
};
