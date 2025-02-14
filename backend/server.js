import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import connectDB from './db/connectDB.js';
import authRoutes from './routes/auth.route.js'

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4001;
connectDB();

// allow us to parse third parties site, here we are explictly passing localhost
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
// allow us to parse incoming requests:req.body
app.use(express.json())
// allows us to parse incoming cookies 
app.use(cookieParser())

app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})