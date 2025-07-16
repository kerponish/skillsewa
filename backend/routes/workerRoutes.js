import express from "express";
import {
  createWorker,
  getAllWorkers,
  getWorkerById,
  updateWorker,
  deleteWorker
} from "../controllers/workerController.js";

const router = express.Router();

router.post("/", createWorker);          // Create
router.get("/", getAllWorkers);          // Read all
router.get("/:id", getWorkerById);       // Read one
router.put("/:id", updateWorker);        // Update
router.delete("/:id", deleteWorker);     // Delete

export default router;
