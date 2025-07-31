import Post from "../models/post.js";
import User from "../models/userModel.js";
import Worker from "../models/worker.js";
import bcrypt from "bcrypt";

// Get all tasks for admin
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Post.findAll({
      include: [
        {
          model: User,
          as: 'requester',
          attributes: ['id', 'username', 'firstname', 'secondname', 'email']
        },
        {
          model: Worker,
          as: 'assignedWorker'
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    
    res.json(tasks);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ error: err.message });
  }
};

// Get all workers
export const getAllWorkers = async (req, res) => {
  try {
    const workers = await Worker.findAll();
    res.json(workers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Assign worker to task
export const assignWorkerToTask = async (req, res) => {
  try {
    const { taskId, workerId } = req.body;
    
    const task = await Post.findByPk(taskId);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    const worker = await Worker.findByPk(workerId);
    if (!worker) {
      return res.status(404).json({ error: 'Worker not found' });
    }
    
    task.assignedTo = workerId;
    task.status = 'assigned';
    await task.save();
    
    res.json({ 
      message: 'Worker assigned successfully',
      task 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update task status
export const updateTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;
    
    const validStatuses = ['pending', 'assigned', 'doing', 'completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    
    const task = await Post.findByPk(taskId);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    task.status = status;
    await task.save();
    
    res.json({ 
      message: 'Task status updated successfully',
      task 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username', 'firstname', 'secondname', 'email', 'role'],
      order: [['createdAt', 'DESC']]
    });
    
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get admin dashboard stats
export const getAdminStats = async (req, res) => {
  try {
    const totalTasks = await Post.count();
    const pendingTasks = await Post.count({ where: { status: 'pending' } });
    const assignedTasks = await Post.count({ where: { status: 'assigned' } });
    const doingTasks = await Post.count({ where: { status: 'doing' } });
    const completedTasks = await Post.count({ where: { status: 'completed' } });
    const totalWorkers = await Worker.count();
    const totalUsers = await User.count();
    
    res.json({
      totalTasks,
      pendingTasks,
      assignedTasks,
      doingTasks,
      completedTasks,
      totalWorkers,
      totalUsers
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update worker information
export const updateWorker = async (req, res) => {
  try {
    const { workerId } = req.params;
    const { skills, experience, hourlyRate, availability } = req.body;
    
    const worker = await Worker.findByPk(workerId);
    if (!worker) {
      return res.status(404).json({ error: 'Worker not found' });
    }
    
    // Update worker fields
    const updateData = {};
    if (skills !== undefined) updateData.skills = skills;
    if (experience !== undefined) updateData.experience = experience;
    if (hourlyRate !== undefined) updateData.hourlyRate = hourlyRate;
    if (availability !== undefined) updateData.availability = availability;
    
    await worker.update(updateData);
    
    res.json({ 
      message: 'Worker updated successfully',
      worker: worker 
    });
  } catch (err) {
    console.error('Error updating worker:', err);
    res.status(500).json({ error: err.message });
  }
};

// Create new worker
export const createWorker = async (req, res) => {
  try {
    const {
      firstname,
      secondname,
      email,
      phone,
      skills,
      location,
      hourlyRate
    } = req.body;

    // Create worker profile directly without User account
    const worker = await Worker.create({
      firstname,
      secondname,
      email,
      phone,
      skills,
      location,
      hourlyRate: parseFloat(hourlyRate),
      availability: 'available'
    });

    res.status(201).json({
      message: 'Worker created successfully',
      worker: worker
    });
  } catch (err) {
    console.error('Error creating worker:', err);
    res.status(500).json({ error: err.message });
  }
}; 