
const Cart = require('../models/cart.model');
const Product = require('../models/product.model');
const User = require('../models/user.model');

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
const getUserCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate({
      path: 'items.product',
      select: 'name price image category stock',
    });
    
    if (!cart) {
      // If no cart exists, create a new one
      cart = await Cart.create({
        user: req.user._id,
        items: [],
        totalAmount: 0,
      });
    }
    
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
const addItemToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    
    // Validate product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient product stock' });
    }
    
    // Find user cart or create new one
    let cart = await Cart.findOne({ user: req.user._id });
    
    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        items: [],
        totalAmount: 0,
      });
    }
    
    // Check if item already exists in cart
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );
    
    if (itemIndex > -1) {
      // Item exists, update quantity
      const newQuantity = cart.items[itemIndex].quantity + quantity;
      
      if (product.stock < newQuantity) {
        return res.status(400).json({ message: 'Insufficient product stock' });
      }
      
      cart.items[itemIndex].quantity = newQuantity;
    } else {
      // Item doesn't exist, add new item
      cart.items.push({
        product: productId,
        quantity,
        price: product.price,
      });
    }
    
    // Save cart
    await cart.save();
    
    // Populate product details
    await cart.populate({
      path: 'items.product',
      select: 'name price image category stock',
    });
    
    res.status(201).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/:itemId
// @access  Private
const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const itemId = req.params.itemId;
    
    // Find user cart
    const cart = await Cart.findOne({ user: req.user._id });
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    // Find item in cart
    const itemIndex = cart.items.findIndex(
      (item) => item._id.toString() === itemId
    );
    
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }
    
    // Check product stock
    const product = await Product.findById(cart.items[itemIndex].product);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient product stock' });
    }
    
    // Update quantity
    cart.items[itemIndex].quantity = quantity;
    
    // Save cart
    await cart.save();
    
    // Populate product details
    await cart.populate({
      path: 'items.product',
      select: 'name price image category stock',
    });
    
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:itemId
// @access  Private
const removeCartItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    
    // Find user cart
    const cart = await Cart.findOne({ user: req.user._id });
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    // Remove item
    cart.items = cart.items.filter(
      (item) => item._id.toString() !== itemId
    );
    
    // Save cart
    await cart.save();
    
    // Populate product details
    await cart.populate({
      path: 'items.product',
      select: 'name price image category stock',
    });
    
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
const clearCart = async (req, res) => {
  try {
    // Find user cart
    const cart = await Cart.findOne({ user: req.user._id });
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    // Clear items
    cart.items = [];
    
    // Save cart
    await cart.save();
    
    res.json({ message: 'Cart cleared successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Apply referral code to cart
// @route   PUT /api/cart/referral
// @access  Private
const applyReferralCode = async (req, res) => {
  try {
    const { referralCode } = req.body;
    
    // Validate referral code
    const referrer = await User.findOne({ referralCode });
    
    if (!referrer) {
      return res.status(400).json({ message: 'Invalid referral code' });
    }
    
    if (referrer._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'You cannot use your own referral code' });
    }
    
    // Find user cart
    const cart = await Cart.findOne({ user: req.user._id });
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    // Apply referral code
    cart.referralCode = referralCode;
    
    // Save cart
    await cart.save();
    
    res.json({ message: 'Referral code applied successfully', cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getUserCart,
  addItemToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
  applyReferralCode,
};
