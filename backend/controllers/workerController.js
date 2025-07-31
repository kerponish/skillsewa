import Worker from "../models/worker.js";
import User from "../models/userModel.js";

// Create Worker
export const createWorker = async (req, res) => {
  try {
    const worker = await Worker.create(req.body);
    
    // Fetch the complete worker data with user info
    const completeWorker = await Worker.findByPk(worker.id, {
      include: [
        {
          model: User,
          attributes: ['id', 'username', 'firstname', 'secondname', 'email', 'phone']
        }
      ]
    });
    
    res.status(201).json({ message: "Worker created", data: completeWorker });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Workers
export const getAllWorkers = async (req, res) => {
  try {
    const workers = await Worker.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'username', 'firstname', 'secondname', 'email', 'phone']
        }
      ]
    });
    res.json(workers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Single Worker
export const getWorkerById = async (req, res) => {
  try {
    const worker = await Worker.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['id', 'username', 'firstname', 'secondname', 'email', 'phone']
        }
      ]
    });
    if (!worker) return res.status(404).json({ message: "Worker not found" });
    res.json(worker);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Worker
export const updateWorker = async (req, res) => {
  try {
    const worker = await Worker.findByPk(req.params.id);
    if (!worker) return res.status(404).json({ message: "Worker not found" });

    await worker.update(req.body);
    
    // Fetch updated worker with user data
    const updatedWorker = await Worker.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['id', 'username', 'firstname', 'secondname', 'email', 'phone']
        }
      ]
    });
    
    res.json({ message: "Worker updated", data: updatedWorker });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Worker
export const deleteWorker = async (req, res) => {
  try {
    const worker = await Worker.findByPk(req.params.id);
    if (!worker) return res.status(404).json({ message: "Worker not found" });

    await worker.destroy();
    res.json({ message: "Worker deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
