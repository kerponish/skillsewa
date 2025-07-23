import express from 'express';
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost
} from '../controllers/postController.js';

const router = express.Router();

// Create a new post/request
router.post('/', createPost);
// Get all posts/requests
router.get('/', getAllPosts);
// Get a single post/request by ID
router.get('/:id', getPostById);
// Update a post/request by ID
router.put('/:id', updatePost);
// Delete a post/request by ID
router.delete('/:id', deletePost);

export default router; 