import express from "express";
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import cors from 'cors'

const app = express();

// .env config
dotenv.config();

// Middlewares
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

// Middleware to parse json
app.use(express.json());

// Middleware to parse cookies
app.use(cookieParser());

// Routes
app.use("/api/v1", authRoutes)
app.use("/api/v1", userRoutes)

export default app;