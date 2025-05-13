
const express = require('express');
const router = express.Router();
const {
  getAffiliateDashboard,
  requestWithdrawal,
  getWithdrawalHistory,
  updateAffiliateSettings,
  processWithdrawal
} = require('../controllers/affiliate.controller');
const { protect } = require('../middlewares/auth.middleware');
const { isAdmin } = require('../middlewares/role.middleware');

// Affiliate routes
router.get('/dashboard', protect, getAffiliateDashboard);
router.post('/withdraw', protect, requestWithdrawal);
router.get('/withdrawals', protect, getWithdrawalHistory);
router.put('/settings', protect, updateAffiliateSettings);

// Admin routes
router.put('/withdrawals/:affiliateId/:withdrawalId', protect, isAdmin, processWithdrawal);

module.exports = router;
