
const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getUserProfile,
} = require('../controllers/auth.controller');
const { protect } = require('../middlewares/auth.middleware');

// Routes
router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, getUserProfile);

module.exports = router;
