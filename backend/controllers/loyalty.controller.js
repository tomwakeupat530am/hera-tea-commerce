
const User = require('../models/user.model');
const Loyalty = require('../models/loyalty.model');

// @desc    Get user's loyalty points
// @route   GET /api/loyalty/points
// @access  Private
const getUserPoints = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ points: user.points });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get user's loyalty history
// @route   GET /api/loyalty/history
// @access  Private
const getLoyaltyHistory = async (req, res) => {
  try {
    const history = await Loyalty.find({ user: req.user._id })
      .sort({ createdAt: -1 });
    
    res.json(history);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Redeem points for discount
// @route   POST /api/loyalty/redeem
// @access  Private
const redeemPoints = async (req, res) => {
  try {
    const { points } = req.body;
    
    // Validate points
    if (!points || points < 100) {
      return res.status(400).json({ message: 'Minimum points for redemption is 100' });
    }
    
    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check if user has enough points
    if (user.points < points) {
      return res.status(400).json({ message: 'Not enough points' });
    }
    
    // Calculate discount amount (1 point = 100 VND)
    const discountAmount = points * 100;
    
    // Create redemption code (random 8 character string)
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let redemptionCode = '';
    
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      redemptionCode += characters.charAt(randomIndex);
    }
    
    // Deduct points from user
    user.points -= points;
    await user.save();
    
    // Create loyalty record
    const loyaltyRecord = await Loyalty.create({
      user: req.user._id,
      points: -points,
      type: 'redeemed',
      description: `Redeemed for ${discountAmount.toLocaleString()} VND discount`,
    });
    
    res.json({
      message: 'Points redeemed successfully',
      redemptionCode,
      discountAmount,
      remainingPoints: user.points,
      loyaltyRecord,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Add loyalty points (admin only)
// @route   POST /api/loyalty/add
// @access  Private/Admin
const addLoyaltyPoints = async (req, res) => {
  try {
    const { userId, points, description } = req.body;
    
    // Validate input
    if (!userId || !points || points <= 0 || !description) {
      return res.status(400).json({ 
        message: 'User ID, points (greater than 0) and description are required' 
      });
    }
    
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Add points to user
    user.points += points;
    await user.save();
    
    // Create loyalty record
    const loyaltyRecord = await Loyalty.create({
      user: userId,
      points,
      type: 'earned',
      description,
    });
    
    res.json({
      message: 'Points added successfully',
      user: {
        _id: user._id,
        name: user.name,
        points: user.points,
      },
      loyaltyRecord,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getUserPoints,
  getLoyaltyHistory,
  redeemPoints,
  addLoyaltyPoints,
};
