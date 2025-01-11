import express from 'express';
import { forgotPassword, resetPassword, loginUser, logoutUser, signupUser, verifyEmail, checkAuth } from '../controllers/auth.controller.js';
import { verifyToken } from '../middlware/verifyToken.js';

const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth)
router.post("/signup", signupUser)
router.post("/login", loginUser)
router.post("/logout", logoutUser)

router.post("/verify-email", verifyEmail)
router.post("/forgot-password", forgotPassword)
router.post("/reset-password/:token", resetPassword)

export default router;