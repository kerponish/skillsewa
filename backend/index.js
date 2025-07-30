import express from "express";
import { db } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";

import User from "./models/userModel.js";
import "./models/associations.js"; // Import associations
import authRoutes from "./routes/authRoutes.js";
import workerRoutes from "./routes/workerRoutes.js"; // ✅ Added
import postRoutes from './routes/postRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();
dotenv.config();
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/workers", workerRoutes); // ✅ Added
app.use("/api/posts", postRoutes);
app.use("/api/admin", adminRoutes);

db(); // DB connection

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
