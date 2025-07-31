import express from "express";
import { 
  getAllTasks, 
  getAllWorkers, 
  getAllUsers,
  assignWorkerToTask, 
  updateTaskStatus, 
  getAdminStats,
  updateWorker,
  createWorker 
} from "../controllers/adminController.js";
import { requireAdmin } from "../middleware/auth.js";

const router = express.Router();

// Apply admin authentication to all routes
router.use(requireAdmin);

// Admin dashboard stats
router.get("/stats", getAdminStats);

// Get all tasks for admin
router.get("/tasks", getAllTasks);

// Get all workers
router.get("/workers", getAllWorkers);

// Get all users
router.get("/users", getAllUsers);

// Assign worker to task
router.post("/assign-worker", assignWorkerToTask);

// Update task status
router.put("/tasks/:taskId/status", updateTaskStatus);

// Update worker information
router.put("/workers/:workerId", updateWorker);

// Create new worker
router.post("/workers", createWorker);

export default router; 