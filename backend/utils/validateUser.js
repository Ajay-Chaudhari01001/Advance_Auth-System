// Utility to validate user input during signup using Joi
// This ensures that the incoming data is in the correct format before saving it to the database
import Joi from 'joi';

/**
 * @function validateUser
 * @description Validates user input (name, email, password) using Joi schema validation.
 * @param {object} userData - The user data from the request body.
 * @returns {object} - Returns an object containing the validation result.
 */
const userValidationSchema = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
        "string.empty": "Name is required",
        "string.min": "Name must be at least 3 characters long",
        "string.max": "Name cannot exceed 30 characters",
    }),
    email: Joi.string().email().required().messages({
        "string.empty": "Email is required",
        "string.email": "Invalid email format",
    }),
    password: Joi.string().min(8).required().messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 8 characters long",
    }),
});

export const validateUser = (userData) => {
    return userValidationSchema.validate(userData);
};
