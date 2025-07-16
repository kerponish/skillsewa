import express from "express";
import { db } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";

import User from "./models/userModel.js";
import authRoutes from "./routes/authRoutes.js";
import workerRoutes from "./routes/workerRoutes.js"; // ✅ Added

const app = express();
dotenv.config();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/workers", workerRoutes); // ✅ Added

db(); // DB connection

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
