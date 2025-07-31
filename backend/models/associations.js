import User from "./userModel.js";
import Post from "./post.js";
import Worker from "./worker.js";

// User associations
User.hasMany(Post, { 
  foreignKey: 'requestedBy', 
  as: 'requester' 
});

// Post associations
Post.belongsTo(User, { 
  foreignKey: 'requestedBy', 
  as: 'requester' 
});

// Post associations with Worker for assignment
Post.belongsTo(Worker, { 
  foreignKey: 'assignedTo', 
  as: 'assignedWorker' 
});
Worker.hasMany(Post, { 
  foreignKey: 'assignedTo', 
  as: 'assignedPosts' 
});

export { User, Post, Worker }; 