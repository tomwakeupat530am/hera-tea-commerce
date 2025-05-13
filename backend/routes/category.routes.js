
const express = require('express');
const router = express.Router();
const {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/category.controller');
const { protect } = require('../middlewares/auth.middleware');
const { isAdmin } = require('../middlewares/role.middleware');

// Public routes
router.get('/', getCategories);
router.get('/:id', getCategoryById);

// Admin only routes
router.post('/', protect, isAdmin, createCategory);
router.put('/:id', protect, isAdmin, updateCategory);
router.delete('/:id', protect, isAdmin, deleteCategory);

module.exports = router;
