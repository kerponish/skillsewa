import express from "express";
import { db } from "./config/db.js";
const app = express();
import dotenv from "dotenv";
import User from "./models/userModel.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

import cors from "cors";
// ...existing code...
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
db(); // Initialize database connection
// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
