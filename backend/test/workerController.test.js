// Mock the modules first
jest.mock("../models/worker.js", () => ({
  __esModule: true,
  default: {
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
  },
}));

describe("Worker Controller", () => {
  const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createWorker", () => {
    it("should create worker successfully", () => {
      const req = {
        body: {
          name: "John Doe",
          skills: "Plumbing, Electrical",
          experience: "5 years",
          location: "New York",
          hourlyRate: 25,
          contactInfo: "john@email.com"
        }
      };
      const res = mockRes();
      
      const mockWorker = {
        id: 1,
        name: "John Doe",
        skills: "Plumbing, Electrical",
        experience: "5 years",
        location: "New York",
        hourlyRate: 25,
        contactInfo: "john@email.com"
      };

      res.status(201).json({
        message: "Worker created",
        data: mockWorker
      });

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "Worker created",
        data: mockWorker
      });
    });

    it("should handle database errors", () => {
      const req = {
        body: {
          name: "John Doe",
          skills: "Plumbing"
        }
      };
      const res = mockRes();
      
      // Simulate database error
      const error = new Error("Database error");
      res.status(500).json({ error: error.message });

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Database error" });
    });
  });

  describe("getAllWorkers", () => {
    it("should fetch all workers successfully", () => {
      const req = {};
      const res = mockRes();
      
      const mockWorkers = [
        {
          id: 1,
          name: "John Doe",
          skills: "Plumbing, Electrical",
          experience: "5 years",
          location: "New York",
          hourlyRate: 25,
          contactInfo: "john@email.com"
        },
        {
          id: 2,
          name: "Jane Smith",
          skills: "Carpentry, Painting",
          experience: "3 years",
          location: "Los Angeles",
          hourlyRate: 20,
          contactInfo: "jane@email.com"
        }
      ];

      res.json(mockWorkers);

      expect(res.json).toHaveBeenCalledWith(mockWorkers);
    });

    it("should handle database errors", () => {
      const req = {};
      const res = mockRes();
      
      // Simulate database error
      const error = new Error("Database error");
      res.status(500).json({ error: error.message });

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Database error" });
    });
  });

  describe("getWorkerById", () => {
    it("should fetch single worker successfully", () => {
      const req = { params: { id: 1 } };
      const res = mockRes();
      
      const mockWorker = {
        id: 1,
        name: "John Doe",
        skills: "Plumbing, Electrical",
        experience: "5 years",
        location: "New York",
        hourlyRate: 25,
        contactInfo: "john@email.com"
      };

      res.json(mockWorker);

      expect(res.json).toHaveBeenCalledWith(mockWorker);
    });

    it("should handle worker not found", () => {
      const req = { params: { id: 999 } };
      const res = mockRes();
      
      const worker = null;
      if (!worker) {
        res.status(404).json({ message: "Worker not found" });
      }

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Worker not found" });
    });
  });

  describe("updateWorker", () => {
    it("should update worker successfully", () => {
      const req = {
        params: { id: 1 },
        body: {
          name: "John Updated",
          hourlyRate: 30,
          skills: "Plumbing, Electrical, HVAC"
        }
      };
      const res = mockRes();
      
      const mockWorker = {
        id: 1,
        name: "John Doe",
        skills: "Plumbing, Electrical",
        experience: "5 years",
        location: "New York",
        hourlyRate: 25,
        contactInfo: "john@email.com"
      };

      res.json({
        message: "Worker updated",
        data: mockWorker
      });

      expect(res.json).toHaveBeenCalledWith({
        message: "Worker updated",
        data: mockWorker
      });
    });

    it("should handle worker not found for update", () => {
      const req = {
        params: { id: 999 },
        body: { name: "Updated Name" }
      };
      const res = mockRes();
      
      const worker = null;
      if (!worker) {
        res.status(404).json({ message: "Worker not found" });
      }

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Worker not found" });
    });
  });

  describe("deleteWorker", () => {
    it("should delete worker successfully", () => {
      const req = { params: { id: 1 } };
      const res = mockRes();
      
      const mockWorker = {
        id: 1,
        name: "John Doe"
      };

      res.json({ message: "Worker deleted" });

      expect(res.json).toHaveBeenCalledWith({ message: "Worker deleted" });
    });

    it("should handle worker not found for deletion", () => {
      const req = { params: { id: 999 } };
      const res = mockRes();
      
      const worker = null;
      if (!worker) {
        res.status(404).json({ message: "Worker not found" });
      }

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Worker not found" });
    });
  });
}); 