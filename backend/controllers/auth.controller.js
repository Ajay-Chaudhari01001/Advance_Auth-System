import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";

export const signupUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            throw new Error("All fields are required");
        }
        const userAlreadyExists = await User.findOne({ email });

        if (userAlreadyExists) {
            return res.status(400).json({ success: false, message: "User Already Exists" })
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        const user = new User({
            name: name,
            email: email,
            password: hashPassword,
            verificationToken: verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours valid
        })

        await user.save();

        generateTokenAndSetCookie(res, user._id)

        res.status(201).json({success: true, message: "User created successfully", user: user})

    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

export const loginUser = async (req, res) => {
    res.send("here is Login routes")
}

export const logoutUser = async (req, res) => {
    res.send("here is Logout routes")
}