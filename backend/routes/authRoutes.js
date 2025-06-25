const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = require('../controllers/authController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

router.post('/register', registerUser, isAdmin);
router.post('/login', loginUser);
router.get('/profile', verifyToken, getUserProfile);

module.exports = router;