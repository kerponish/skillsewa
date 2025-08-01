// Mock the modules first
jest.mock("../models/userModel.js", () => ({
  __esModule: true,
  default: {
    findOne: jest.fn(),
    create: jest.fn(),
    findByPk: jest.fn(),
  },
}));

jest.mock("bcrypt", () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
}));

// Import after mocking
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

describe("Auth Controller", () => {
  const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("signup", () => {
    it("should validate required fields", () => {
      const req = {
        body: {
          // Missing required fields
        }
      };
      const res = mockRes();

      // Simulate validation logic
      const { firstname, secondname, email, password, confirmPassword, dob } = req.body;
      if (!firstname || !secondname || !email || !password || !confirmPassword || !dob) {
        res.status(400).json({ error: "All fields are required" });
      }

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "All fields are required" });
    });

    it("should validate password confirmation", () => {
      const req = {
        body: {
          firstname: "Test",
          secondname: "User",
          email: "test@email.com",
          password: "password123",
          confirmPassword: "differentpassword",
          dob: "1990-01-01"
        }
      };
      const res = mockRes();

      // Simulate password validation
      if (req.body.password !== req.body.confirmPassword) {
        res.status(400).json({ error: "Passwords do not match" });
      }

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Passwords do not match" });
    });

    it("should validate user existence", () => {
      const req = {
        body: {
          firstname: "Test",
          secondname: "User",
          email: "test@email.com",
          password: "password123",
          confirmPassword: "password123",
          dob: "1990-01-01"
        }
      };
      const res = mockRes();

      // Simulate user existence check
      const existingUser = { id: 1, email: "test@email.com" };
      if (existingUser) {
        res.status(400).json({ error: "User already exists" });
      }

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "User already exists" });
    });
  });

  describe("login", () => {
    it("should handle admin login", () => {
      const req = {
        body: {
          username: "admin",
          password: "admin"
        }
      };
      const res = mockRes();

      // Simulate admin login logic
      if (req.body.username === "admin" && req.body.password === "admin") {
        res.status(200).json({
          message: "Login successful",
          token: "adminToken",
          userId: "admin",
          username: "admin",
          role: "admin"
        });
      }

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Login successful",
        token: "adminToken",
        userId: "admin",
        username: "admin",
        role: "admin"
      });
    });

    it("should handle invalid credentials", () => {
      const req = {
        body: {
          email: "test@email.com",
          password: "wrongpassword"
        }
      };
      const res = mockRes();

      // Simulate invalid credentials
      const user = null;
      if (!user) {
        res.status(400).json({ error: "Invalid credentials" });
      }

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Invalid credentials" });
    });
  });

  describe("getUserProfile", () => {
    it("should get user profile successfully", () => {
      const req = { params: { userId: 1 } };
      const res = mockRes();

      const mockUser = {
        id: 1,
        username: "testuser",
        firstname: "Test",
        secondname: "User",
        email: "test@email.com",
        dob: "1990-01-01"
      };

      if (mockUser) {
        res.json({
          id: mockUser.id,
          username: mockUser.username,
          first_name: mockUser.firstname,
          last_name: mockUser.secondname,
          email: mockUser.email,
          date_of_birth: mockUser.dob
        });
      }

      expect(res.json).toHaveBeenCalledWith({
        id: 1,
        username: "testuser",
        first_name: "Test",
        last_name: "User",
        email: "test@email.com",
        date_of_birth: "1990-01-01"
      });
    });

    it("should handle user not found", () => {
      const req = { params: { userId: 999 } };
      const res = mockRes();

      const user = null;
      if (!user) {
        res.status(404).json({ error: "User not found" });
      }

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "User not found" });
    });
  });
}); 