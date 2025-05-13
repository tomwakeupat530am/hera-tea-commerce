
const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrderById,
  updateOrderStatus,
  updateOrderToPaid,
  getOrders
} = require('../controllers/order.controller');
const { protect } = require('../middlewares/auth.middleware');
const { isAdmin } = require('../middlewares/role.middleware');

// User routes
router.post('/', protect, createOrder);
router.get('/:id', protect, getOrderById);
router.put('/:id/pay', protect, updateOrderToPaid);

// Admin routes
router.get('/', protect, isAdmin, getOrders);
router.put('/:id/status', protect, isAdmin, updateOrderStatus);

module.exports = router;
