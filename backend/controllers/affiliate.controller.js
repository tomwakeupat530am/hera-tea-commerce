
const User = require('../models/user.model');
const Affiliate = require('../models/affiliate.model');
const Order = require('../models/order.model');

// @desc    Get affiliate dashboard data
// @route   GET /api/affiliate/dashboard
// @access  Private (affiliates only)
const getAffiliateDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user.isAffiliate) {
      return res.status(403).json({ message: 'Not an affiliate' });
    }
    
    // Get affiliate data
    let affiliate = await Affiliate.findOne({ user: req.user._id });
    
    if (!affiliate) {
      affiliate = await Affiliate.create({
        user: req.user._id,
        totalCommission: 0,
        availableCommission: 0,
        withdrawnCommission: 0,
        orders: [],
      });
    }
    
    // Count referrals
    const referralCount = await User.countDocuments({ referrer: req.user._id });
    
    // Get recent referred orders
    const recentOrders = await Order.find({ affiliateUser: req.user._id })
      .sort({ createdAt: -1 })
      .limit(5);
    
    // Calculate performance metrics
    const totalOrders = await Order.countDocuments({ affiliateUser: req.user._id });
    
    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);
    
    const monthlyOrders = await Order.countDocuments({
      affiliateUser: req.user._id,
      createdAt: { $gte: monthStart },
    });
    
    const monthlyCommission = await Order.aggregate([
      {
        $match: {
          affiliateUser: req.user._id,
          createdAt: { $gte: monthStart },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$affiliateCommission' },
        },
      },
    ]);
    
    res.json({
      referralCode: user.referralCode,
      referralCount,
      totalCommission: affiliate.totalCommission,
      availableCommission: affiliate.availableCommission,
      withdrawnCommission: affiliate.withdrawnCommission,
      totalOrders,
      monthlyOrders,
      monthlyCommission: monthlyCommission[0]?.total || 0,
      recentOrders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Request withdrawal
// @route   POST /api/affiliate/withdraw
// @access  Private (affiliates only)
const requestWithdrawal = async (req, res) => {
  try {
    const { amount, bankInfo } = req.body;
    
    if (!amount || amount < 100000) {
      return res.status(400).json({ message: 'Minimum withdrawal amount is 100,000 VND' });
    }
    
    if (!bankInfo || !bankInfo.bankName || !bankInfo.accountNumber || !bankInfo.accountName) {
      return res.status(400).json({ message: 'Bank information is required' });
    }
    
    const user = await User.findById(req.user._id);
    
    if (!user.isAffiliate) {
      return res.status(403).json({ message: 'Not an affiliate' });
    }
    
    // Get affiliate data
    const affiliate = await Affiliate.findOne({ user: req.user._id });
    
    if (!affiliate) {
      return res.status(404).json({ message: 'Affiliate account not found' });
    }
    
    // Check available balance
    if (affiliate.availableCommission < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }
    
    // Create withdrawal request
    affiliate.withdrawals.push({
      amount,
      status: 'pending',
      notes: `Requested on ${new Date().toLocaleDateString()}`,
    });
    
    // Update bank info if provided
    if (bankInfo) {
      affiliate.bankInfo = bankInfo;
    }
    
    // Reduce available balance
    affiliate.availableCommission -= amount;
    
    await affiliate.save();
    
    res.json({
      message: 'Withdrawal request submitted successfully',
      withdrawalRequest: affiliate.withdrawals[affiliate.withdrawals.length - 1],
      availableBalance: affiliate.availableCommission,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get withdrawal history
// @route   GET /api/affiliate/withdrawals
// @access  Private (affiliates only)
const getWithdrawalHistory = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user.isAffiliate) {
      return res.status(403).json({ message: 'Not an affiliate' });
    }
    
    const affiliate = await Affiliate.findOne({ user: req.user._id });
    
    if (!affiliate) {
      return res.status(404).json({ message: 'Affiliate account not found' });
    }
    
    res.json({
      withdrawals: affiliate.withdrawals.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      ),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update affiliate settings
// @route   PUT /api/affiliate/settings
// @access  Private (affiliates only)
const updateAffiliateSettings = async (req, res) => {
  try {
    const { bankInfo } = req.body;
    
    const user = await User.findById(req.user._id);
    
    if (!user.isAffiliate) {
      return res.status(403).json({ message: 'Not an affiliate' });
    }
    
    let affiliate = await Affiliate.findOne({ user: req.user._id });
    
    if (!affiliate) {
      affiliate = await Affiliate.create({
        user: req.user._id,
        totalCommission: 0,
        availableCommission: 0,
        withdrawnCommission: 0,
        orders: [],
      });
    }
    
    if (bankInfo) {
      affiliate.bankInfo = {
        bankName: bankInfo.bankName || affiliate.bankInfo?.bankName,
        accountNumber: bankInfo.accountNumber || affiliate.bankInfo?.accountNumber,
        accountName: bankInfo.accountName || affiliate.bankInfo?.accountName,
      };
    }
    
    await affiliate.save();
    
    res.json({
      message: 'Settings updated successfully',
      bankInfo: affiliate.bankInfo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Process withdrawal (admin only)
// @route   PUT /api/affiliate/withdrawals/:affiliateId/:withdrawalId
// @access  Private/Admin
const processWithdrawal = async (req, res) => {
  try {
    const { status, notes } = req.body;
    
    if (!status || !['approved', 'rejected', 'paid'].includes(status)) {
      return res.status(400).json({ message: 'Valid status is required' });
    }
    
    const affiliate = await Affiliate.findById(req.params.affiliateId);
    
    if (!affiliate) {
      return res.status(404).json({ message: 'Affiliate not found' });
    }
    
    const withdrawal = affiliate.withdrawals.id(req.params.withdrawalId);
    
    if (!withdrawal) {
      return res.status(404).json({ message: 'Withdrawal request not found' });
    }
    
    // Update withdrawal status
    withdrawal.status = status;
    withdrawal.notes = notes || withdrawal.notes;
    withdrawal.processedAt = Date.now();
    
    // If rejected, return amount to available balance
    if (status === 'rejected') {
      affiliate.availableCommission += withdrawal.amount;
    }
    
    // If paid, update withdrawn amount
    if (status === 'paid') {
      affiliate.withdrawnCommission += withdrawal.amount;
    }
    
    await affiliate.save();
    
    res.json({
      message: `Withdrawal ${status} successfully`,
      withdrawal,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getAffiliateDashboard,
  requestWithdrawal,
  getWithdrawalHistory,
  updateAffiliateSettings,
  processWithdrawal,
};
