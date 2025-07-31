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
        role: 'user' // All signup users are clients
      });
  
      res.status(201).json({ message: "User created", user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

export const login = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    
    console.log('Login attempt:', { email, username, hasPassword: !!password });
    
    // Special admin login check
    if (username === 'admin' && password === 'admin') {
      const token = jwt.sign({ userId: 'admin', role: 'admin' }, process.env.JWT_SECRET, { expiresIn: "1h" });
      
      console.log('Admin login successful');
      
      res.status(200).json({ 
        message: "Login successful", 
        token,
        userId: 'admin',
        username: 'admin',
        role: 'admin'
      });
      return;
    }
    
    // Regular user login
    let user;
    if (username) {
      // Admin login - only check by username
      user = await User.findOne({ where: { username } });
      console.log('Admin login - user found:', !!user);
    } else {
      // Client login - only check by email
      user = await User.findOne({ where: { email } });
      console.log('Client login - user found:', !!user);
    }
    
    if (!user) {
      console.log('User not found');
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch);
    
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    console.log('Login successful for user:', user.username, 'Role:', user.role);

    res.status(200).json({ 
      message: "Login successful", 
      token,
      userId: user.id,
      username: user.username,
      role: user.role
    });
  } catch (err) {
    console.error('Login error:', err);
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

export const getUserProfileByUsername = async (req, res) => {
  try {
    const user = await User.findOne({ 
      where: { username: req.params.username },
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

export const changePassword = async (req, res) => {
  try {
    const { userId, oldPassword, newPassword } = req.body;
    
    // Validate input
    if (!userId || !oldPassword || !newPassword) {
      return res.status(400).json({ error: "All fields are required" });
    }
    
    if (newPassword.length < 6) {
      return res.status(400).json({ error: "New password must be at least 6 characters long" });
    }
    
    // Find user
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    // Verify old password
    const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isOldPasswordValid) {
      return res.status(400).json({ error: "Current password is incorrect" });
    }
    
    // Check if new password is same as old password
    const isNewPasswordSame = await bcrypt.compare(newPassword, user.password);
    if (isNewPasswordSame) {
      return res.status(400).json({ error: "New password must be different from current password" });
    }
    
    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    
    // Update password
    user.password = hashedNewPassword;
    await user.save();
    
    res.json({ 
      message: "Password changed successfully",
      success: true
    });
  } catch (err) {
    console.error('Change password error:', err);
    res.status(500).json({ error: err.message });
  }
};

