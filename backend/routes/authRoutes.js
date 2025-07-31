import express from "express";
import { signup, login, getUserProfile, getUserProfileByUsername, updateUserProfile, changePassword } from "../controllers/authController.js";
const router = express.Router();
// Import the signup and login functions from the controller
router.post("/signup", signup); // Route for user signup
router.post("/login", login); // Route for user login
router.get("/profile/:userId", getUserProfile);
router.get("/profile/username/:username", getUserProfileByUsername);
router.put("/profile/:userId", updateUserProfile);
router.put("/change-password", changePassword); // Route for changing password

export default router;