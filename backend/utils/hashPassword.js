// Utility to hash the user's password using bcrypt
// This ensures that passwords are never stored as plain text in the database
import bcrypt from 'bcryptjs';

/**
 * @function hashPassword
 * @description Takes a plain text password and hashes it using bcrypt with a salt round of 10.
 * @param {string} password - The plain text password to be hashed.
 * @returns {Promise<string>} - A hashed version of the password.
 */
export const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};
