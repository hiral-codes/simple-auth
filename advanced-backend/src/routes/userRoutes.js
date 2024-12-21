import express from "express";
import { getUser } from "../controllers/authController.js";
import { isLoggedIn } from "../middleware/authMiddleware.js";
import { deleteUser, updateUser } from "../controllers/userController.js";
const router = express.Router();

// Protected Route
router.get("/users", getUser)
// Update User
router.put("/user/:id", updateUser)
// Delete User
router.delete("/user/:id", deleteUser)

export default router;