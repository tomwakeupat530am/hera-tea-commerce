
const express = require('express');
const router = express.Router();
const {
  getUserPoints,
  getLoyaltyHistory,
  redeemPoints,
  addLoyaltyPoints,
} = require('../controllers/loyalty.controller');
const { protect } = require('../middlewares/auth.middleware');
const { isAdmin } = require('../middlewares/role.middleware');

// User routes
router.get('/points', protect, getUserPoints);
router.get('/history', protect, getLoyaltyHistory);
router.post('/redeem', protect, redeemPoints);

// Admin routes
router.post('/add', protect, isAdmin, addLoyaltyPoints);

module.exports = router;
