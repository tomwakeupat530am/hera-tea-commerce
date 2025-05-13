
const express = require('express');
const router = express.Router();
const {
  getUserCart,
  addItemToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
  applyReferralCode,
} = require('../controllers/cart.controller');
const { protect } = require('../middlewares/auth.middleware');

// Routes
router.get('/', protect, getUserCart);
router.post('/', protect, addItemToCart);
router.put('/:itemId', protect, updateCartItem);
router.delete('/:itemId', protect, removeCartItem);
router.delete('/', protect, clearCart);
router.put('/referral', protect, applyReferralCode);

module.exports = router;
