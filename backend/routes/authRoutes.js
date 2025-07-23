import express from "express";
import { signup, login, getUserProfile, updateUserProfile } from "../controllers/authController.js";
const router = express.Router();
// Import the signup and login functions from the controller
router.post("/signup", signup); // Route for user signup
router.post("/login", login); // Route for user login
router.get("/profile/:userId", getUserProfile);
router.put("/profile/:userId", updateUserProfile);

export default router;