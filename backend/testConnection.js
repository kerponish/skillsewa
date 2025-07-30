import { sequelize } from "./config/db.js";
import User from "./models/userModel.js";
import "./models/associations.js";

const testConnection = async () => {
  try {
    console.log('Testing database connection...');
    
    // Test connection
    await sequelize.authenticate();
    console.log('✅ Database connection successful');
    
    // Sync tables
    await sequelize.sync();
    console.log('✅ Tables synced successfully');
    
    // Check if admin user exists
    const adminUser = await User.findOne({ where: { username: 'admin' } });
    if (adminUser) {
      console.log('✅ Admin user exists');
      console.log('Username:', adminUser.username);
      console.log('Role:', adminUser.role);
    } else {
      console.log('❌ Admin user not found');
    }
    
    // Check all users
    const allUsers = await User.findAll();
    console.log(`Total users: ${allUsers.length}`);
    allUsers.forEach(user => {
      console.log(`- ${user.username} (${user.email}) - Role: ${user.role}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

testConnection(); 