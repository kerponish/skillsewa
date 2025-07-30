import User from "./userModel.js";
import Post from "./post.js";
import Worker from "./worker.js";

// User associations
User.hasMany(Post, { 
  foreignKey: 'requestedBy', 
  as: 'requester' 
});
User.hasMany(Post, { 
  foreignKey: 'assignedTo', 
  as: 'assignedWorker' 
});

// Post associations
Post.belongsTo(User, { 
  foreignKey: 'requestedBy', 
  as: 'requester' 
});
Post.belongsTo(User, { 
  foreignKey: 'assignedTo', 
  as: 'assignedWorker' 
});

// Worker associations
Worker.belongsTo(User, { 
  foreignKey: 'userId' 
});
User.hasOne(Worker, { 
  foreignKey: 'userId' 
});

export { User, Post, Worker }; 