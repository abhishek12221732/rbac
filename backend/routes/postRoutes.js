const express = require('express');
const router = express.Router();
const { getPosts, createPost, deletePost } = require('../controllers/postController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

router.route('/')
  .get(getPosts)
  .post(verifyToken, isAdmin, createPost); // Only admin can create

router.route('/:id')
  .delete(verifyToken, isAdmin, deletePost); // Only admin can delete

module.exports = router;