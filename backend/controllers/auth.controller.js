import bcrypt from "bcryptjs";
import crypto from "crypto";
import User from "../models/user.model.js";
import { hashPassword } from "../utils/hashPassword.js";
import { generateVerificationToken } from "../utils/generateVerificationToken.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { validateUser } from "../utils/validateUser.js";
import { sendPasswordResetEmail, sendResetSuccessEmail, sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/email.js";

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
            return res.status(400).json({ success: false, message: "Invalid or expired verification code" })
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
        // console.log("Error in verify email ", error)
        res.status(500).json({ success: false, message: error.message });
    }
}

export const loginUser = async (req, res) => {
    // Validate user input
    // const { error } = validateUser(req.body);
    // if (error) {
    //     return res.status(400).json({ success: false, message: error.details[0].message });
    // }
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid Credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(4000).json({ success: false, message: "Invalid password" })
        }
        generateTokenAndSetCookie(res, user._id)

        user.lastLogin = new Date();
        await user.save();

        res.status(200).json({
            success: true,
            message: "Login successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        // console.log("Error in Login User ", error)
        res.status(500).json({ success: false, message: error.message });
    }
}

export const logoutUser = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logout Successfully" })
}

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;

        await user.save();

        // send email
        await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

        res.status(200).json({ success: true, message: "Password reset link sent to your email" });
    } catch (error) {
        // console.log("Error in forgotPassword ", error);
        res.status(400).json({ success: false, message: error.message });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
        }

        // update password
        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;
        await user.save();

        await sendResetSuccessEmail(user.email);

        res.status(200).json({ success: true, message: "Password reset successful" });
    } catch (error) {
        // console.log("Error in resetPassword ", error);
        res.status(400).json({ success: false, message: error.message });
    }
};

export const checkAuth = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, user });
    } catch (error) {
        console.log("Error in checkAuth ", error);
        res.status(400).json({ success: false, message: error.message });
    }
};
