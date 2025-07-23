import Post from '../models/post.js';

// Create a new post/request
export const createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json({ message: 'Post created', data: post });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all posts/requests
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single post/request by ID
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a post/request by ID
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    await post.update(req.body);
    res.json({ message: 'Post updated', data: post });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a post/request by ID
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    await post.destroy();
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 