import express from "express";
import { createUser, login } from "../controllers/authController.js";
const router = express.Router();

// Creating a user
router.post("/auth/register", createUser)
// Login
router.post("/auth/login", login)

export default router;