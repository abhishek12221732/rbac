const Post = require('../models/Post');

// @desc    Fetch all posts
// @route   GET /api/posts
// @access  Public
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a post
// @route   POST /api/posts
// @access  Private/Admin
const createPost = async (req, res) => {
  const { title, content } = req.body;
  try {
    const post = new Post({
      title,
      content,
      author: req.user._id,
      authorName: req.user.name,
    });
    const createdPost = await post.save();
    res.status(201).json(createdPost);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private/Admin
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      await post.deleteOne(); // or post.remove() for older mongoose versions
      res.json({ message: 'Post removed' });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getPosts, createPost, deletePost };