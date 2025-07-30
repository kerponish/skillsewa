import bcrypt from "bcrypt";
import { sequelize } from "./config/db.js";
import User from "./models/userModel.js";
import "./models/associations.js"; // Import associations

const createAdmin = async () => {
  try {
    // Sync database to ensure tables exist
    await sequelize.sync();
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ where: { username: 'admin' } });
    if (existingAdmin) {
      console.log('✅ Admin user already exists!');
      console.log('Username: admin');
      console.log('Password: admin');
      process.exit(0);
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin', 10);
    const admin = await User.create({
      username: 'admin',
      firstname: 'Admin',
      secondname: 'User',
      email: 'admin@skillssewa.com',
      password: hashedPassword,
      dob: new Date('1990-01-01'),
      role: 'admin'
    });

    console.log('✅ Admin user created successfully!');
    console.log('Username: admin');
    console.log('Password: admin');
    console.log('Role: admin');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin(); 