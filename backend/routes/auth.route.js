import express from 'express';
import { forgotPassword, resetPassword, loginUser, logoutUser, signupUser, verifyEmail } from '../controllers/auth.controller.js';

const router = express.Router();

router.post("/signup", signupUser)
router.post("/login", loginUser)
router.post("/logout", logoutUser)

router.post("/verify-email", verifyEmail)
router.post("/forgot-password", forgotPassword)
router.post("/reset-password/:token", resetPassword)

export default router;