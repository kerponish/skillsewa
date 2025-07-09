const express = require("express");
const app = express();
const userModel = require("./models/userModel"); // adjust if path differs

// Middleware
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Initialize DB Table
userModel.initializeUserTable()
  .then(() => console.log("✅ Users table is ready."))
  .catch((err) => console.error("❌ Failed to initialize users table:", err.message));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
