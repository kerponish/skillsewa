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

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      attributes: ['id', 'username', 'firstname', 'secondname', 'email', 'dob']
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({
      id: user.id,
      username: user.username,
      first_name: user.firstname,
      last_name: user.secondname,
      email: user.email,
      date_of_birth: user.dob
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    const { firstName, lastName, email, dateOfBirth } = req.body;
    user.firstname = firstName || user.firstname;
    user.secondname = lastName || user.secondname;
    user.email = email || user.email;
    user.dob = dateOfBirth || user.dob;
    await user.save();
    res.json({
      message: 'Profile updated',
      user: {
        id: user.id,
        username: user.username,
        first_name: user.firstname,
        last_name: user.secondname,
        email: user.email,
        date_of_birth: user.dob
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

