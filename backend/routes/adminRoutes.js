import express from "express";
import { 
  getAllTasks, 
  getAllWorkers, 
  assignWorkerToTask, 
  updateTaskStatus, 
  getAdminStats 
} from "../controllers/adminController.js";

const router = express.Router();

// Admin dashboard stats
router.get("/stats", getAdminStats);

// Get all tasks for admin
router.get("/tasks", getAllTasks);

// Get all workers
router.get("/workers", getAllWorkers);

// Assign worker to task
router.post("/assign-worker", assignWorkerToTask);

// Update task status
router.put("/tasks/:taskId/status", updateTaskStatus);

export default router; 