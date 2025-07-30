import { sequelize } from "./config/db.js";
import User from "./models/userModel.js";
import "./models/associations.js";

const updateUsers = async () => {
  try {
    // Sync database to ensure tables exist
    await sequelize.sync();
    
    // Update all existing users to have role 'user' if they don't have it
    const users = await User.findAll();
    console.log(`Found ${users.length} users`);
    
    for (const user of users) {
      if (!user.role) {
        user.role = 'user';
        await user.save();
        console.log(`Updated user ${user.username} with role: user`);
      } else {
        console.log(`User ${user.username} already has role: ${user.role}`);
      }
    }
    
    console.log('✅ All users updated successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error updating users:', error);
    process.exit(1);
  }
};

updateUsers(); 