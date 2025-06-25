const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../db");
const transporter = require("../email");

const router = express.Router();

// === SIGNUP ===
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
      [name, email, hashedPassword]
    );

    const newUser = result.rows[0];

    await sendVerificationEmail(newUser.email);

    res.status(201).json({ message: "Signup successful. Please verify your email." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Signup failed" });
  }
});

// === SEND VERIFICATION EMAIL ===
async function sendVerificationEmail(email) {
  const token = jwt.sign({ email }, "emailSecretKey", { expiresIn: "1h" });
  const url = `http://localhost:5000/api/auth/verify/${token}`;

  await transporter.sendMail({
    to: email,
    subject: "Verify Your Email",
    html: `<p>Click <a href="${url}">here</a> to verify your email.</p>`
  });

  await pool.query("UPDATE users SET verification_sent_at = NOW() WHERE email = $1", [email]);
}

// === VERIFY EMAIL ===
router.get("/verify/:token", async (req, res) => {
  const { token } = req.params;

  try {
    const { email } = jwt.verify(token, "emailSecretKey");

    await pool.query("UPDATE users SET verified = true WHERE email = $1", [email]);

    res.send("✅ Email verified! You can now log in.");
  } catch (err) {
    console.error(err);
    res.status(400).send("❌ Invalid or expired token.");
  }
});

// === LOGIN ===
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    const user = result.rows[0];

    if (!user) return res.status(401).json({ error: "User not found" });
    if (!user.verified) return res.status(403).json({ error: "Please verify your email" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Incorrect password" });

    const token = jwt.sign({ id: user.id }, "secretkey", { expiresIn: "1d" });

    res.json({
      message: "Login successful",
      token,
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// === RESEND VERIFICATION ===
router.post("/resend-verification", async (req, res) => {
  const { email } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    const user = result.rows[0];

    if (!user) return res.status(400).json({ error: "User not found" });
    if (user.verified) return res.status(400).json({ error: "Email already verified" });

    await sendVerificationEmail(email);
    res.json({ message: "Verification email sent again" });
  } catch (err) {
    res.status(500).json({ error: "Could not resend verification" });
  }
});

module.exports = router;
