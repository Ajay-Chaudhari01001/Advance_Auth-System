import User from "../models/user.model.js";
import { hashPassword } from "../utils/hashPassword.js";
import { generateVerificationToken } from "../utils/generateVerificationToken.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { validateUser } from "../utils/validateUser.js";
import { sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/email.js";

export const signupUser = async (req, res) => {
    try {
        // Validate user input
        const { error } = validateUser(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        const { name, email, password } = req.body;

        // Check if user already exists
        const userAlreadyExists = await User.findOne({ email });
        if (userAlreadyExists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Generate verification token
        const { token, expiresAt } = generateVerificationToken();

        // Create new user
        const user = new User({
            name,
            email,
            password: hashedPassword,
            verificationToken: token,
            verificationTokenExpiresAt: expiresAt,
        });

        // Save user to the database
        await user.save();

        // Generate token and set cookie
        generateTokenAndSetCookie(res, user._id);

        sendVerificationEmail(user.email, token);

        // Response
        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const verifyEmail = async (req, res) => {
    const { code } = req.body;

    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() }
        })

        if (!user) {
            return res.status(400).json({ success: talse, message: "Invalid or expired verification code" })
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();

        await sendWelcomeEmail(user.email, user.name)

        res.status(200).json({
            success: true,
            message: "Email verify successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.log("Error in verify email ", error )
        res.status(500).json({ success: false, message: error.message });
    }
}
