import express from 'express';
import { signupUser, verifyEmail } from '../controllers/auth.controller.js';

const router = express.Router();

router.post("/signup", signupUser)

router.post("/verify-email", verifyEmail)


export default router;