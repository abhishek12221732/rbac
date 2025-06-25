const express = require('express');
const router = express.Router();
const { getPosts, createPost, deletePost, updatePost } = require('../controllers/postController'); // import updatePost
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

router.route('/')
  .get(getPosts)
  .post(verifyToken, isAdmin, createPost);

router.route('/:id')
  .delete(verifyToken, isAdmin, deletePost)
  .put(verifyToken, isAdmin, updatePost); 

module.exports = router;