import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const signup = async (req, res) => {
  console.log(req.body);
  
    try {
      const { username,firstname, secondname, email, password, confirmPassword, dob } = req.body;
  
      if (!firstname || !secondname || !email || !password || !confirmPassword || !dob) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
      }
  
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) return res.status(400).json({ error: "User already exists" });
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        username,
        firstname: firstname,
        secondname: secondname,
        email,
        dob,
        password: hashedPassword,
      });
  
      res.status(201).json({ message: "User created", user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

