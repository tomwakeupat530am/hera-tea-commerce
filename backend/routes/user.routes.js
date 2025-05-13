
const express = require('express');
const router = express.Router();
const {
  updateUserProfile,
  getUserOrders,
  getUserPointsHistory,
  changePassword,
} = require('../controllers/user.controller');
const { protect } = require('../middlewares/auth.middleware');

// Routes
router.put('/profile', protect, updateUserProfile);
router.get('/orders', protect, getUserOrders);
router.get('/points', protect, getUserPointsHistory);
router.put('/change-password', protect, changePassword);

module.exports = router;
