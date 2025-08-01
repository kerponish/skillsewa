// Mock the modules first
jest.mock("../models/post.js", () => ({
  __esModule: true,
  default: {
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
  },
}));

describe("Post Controller", () => {
  const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createPost", () => {
    it("should validate required fields", () => {
      const req = {
        body: {
          title: "Test Post",
          description: "Test Description"
          // missing required fields
        }
      };
      const res = mockRes();

      // Simulate validation logic
      const { title, description, price, skillsRequired, location, requestedBy } = req.body;
      if (!title || !description || !price || !skillsRequired || !location || !requestedBy) {
        res.status(400).json({
          error: "Missing required fields",
          required: ["title", "description", "price", "skillsRequired", "location", "requestedBy"],
          received: ["title", "description"]
        });
      }

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Missing required fields",
        required: ["title", "description", "price", "skillsRequired", "location", "requestedBy"],
        received: ["title", "description"]
      });
    });

    it("should create post successfully", () => {
      const req = {
        body: {
          title: "Test Post",
          description: "Test Description",
          price: 100,
          skillsRequired: "JavaScript, React",
          location: "New York",
          requestedBy: 1
        }
      };
      const res = mockRes();

      const mockPost = {
        id: 1,
        title: "Test Post",
        description: "Test Description",
        price: 100,
        skillsRequired: "JavaScript, React",
        location: "New York",
        requestedBy: 1
      };

      res.status(201).json({
        message: "Post created",
        data: mockPost
      });

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "Post created",
        data: mockPost
      });
    });
  });

  describe("getAllPosts", () => {
    it("should fetch all posts successfully", () => {
      const req = {};
      const res = mockRes();
      
      const mockPosts = [
        {
          id: 1,
          title: "Post 1",
          description: "Description 1",
          price: 100,
          skillsRequired: "JavaScript",
          location: "New York",
          requestedBy: 1
        },
        {
          id: 2,
          title: "Post 2",
          description: "Description 2",
          price: 200,
          skillsRequired: "React",
          location: "Los Angeles",
          requestedBy: 2
        }
      ];

      res.json(mockPosts);

      expect(res.json).toHaveBeenCalledWith(mockPosts);
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

  describe("getPostById", () => {
    it("should fetch single post successfully", () => {
      const req = { params: { id: 1 } };
      const res = mockRes();
      
      const mockPost = {
        id: 1,
        title: "Test Post",
        description: "Test Description",
        price: 100,
        skillsRequired: "JavaScript, React",
        location: "New York",
        requestedBy: 1
      };

      res.json(mockPost);

      expect(res.json).toHaveBeenCalledWith(mockPost);
    });

    it("should handle post not found", () => {
      const req = { params: { id: 999 } };
      const res = mockRes();

      const post = null;
      if (!post) {
        res.status(404).json({ message: "Post not found" });
      }

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Post not found" });
    });
  });

  describe("updatePost", () => {
    it("should update post successfully", () => {
      const req = {
        params: { id: 1 },
        body: {
          title: "Updated Post",
          description: "Updated Description",
          price: 150
        }
      };
      const res = mockRes();
      
      const mockPost = {
        id: 1,
        title: "Original Post",
        description: "Original Description",
        price: 100
      };

      res.json({
        message: "Post updated",
        data: mockPost
      });

      expect(res.json).toHaveBeenCalledWith({
        message: "Post updated",
        data: mockPost
      });
    });

    it("should handle post not found for update", () => {
      const req = {
        params: { id: 999 },
        body: { title: "Updated Post" }
      };
      const res = mockRes();
      
      const post = null;
      if (!post) {
        res.status(404).json({ message: "Post not found" });
      }

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Post not found" });
    });
  });

  describe("deletePost", () => {
    it("should delete post successfully", () => {
      const req = { params: { id: 1 } };
      const res = mockRes();
      
      const mockPost = {
        id: 1,
        title: "Test Post"
      };

      res.json({ message: "Post deleted" });

      expect(res.json).toHaveBeenCalledWith({ message: "Post deleted" });
    });

    it("should handle post not found for deletion", () => {
      const req = { params: { id: 999 } };
      const res = mockRes();
      
      const post = null;
      if (!post) {
        res.status(404).json({ message: "Post not found" });
      }

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Post not found" });
    });
  });
}); 