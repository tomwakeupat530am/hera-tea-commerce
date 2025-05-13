
const Order = require('../models/order.model');
const Cart = require('../models/cart.model');
const Product = require('../models/product.model');
const User = require('../models/user.model');
const Loyalty = require('../models/loyalty.model');
const Affiliate = require('../models/affiliate.model');
const { calculateCommission } = require('../utils/referral');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
  try {
    const {
      shippingAddress,
      paymentMethod,
      paymentDetails,
      note,
    } = req.body;
    
    // Get user's cart
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'No items in cart' });
    }
    
    // Check if all products are in stock
    for (const item of cart.items) {
      const product = await Product.findById(item.product);
      
      if (!product) {
        return res.status(404).json({ message: `Product ${item.product} not found` });
      }
      
      if (product.stock < item.quantity) {
        return res.status(400).json({ 
          message: `Not enough stock for ${product.name}. Available: ${product.stock}` 
        });
      }
    }
    
    // Calculate prices
    const itemsPrice = cart.totalAmount;
    const shippingPrice = 30000; // Fixed shipping fee for now
    const taxPrice = Math.round(itemsPrice * 0.1); // 10% tax
    const totalPrice = itemsPrice + shippingPrice + taxPrice;
    
    // Create order
    const order = new Order({
      user: req.user._id,
      orderItems: cart.items.map(item => ({
        product: item.product._id,
        name: item.product.name,
        quantity: item.quantity,
        image: item.product.image,
        price: item.price,
      })),
      shippingAddress,
      paymentMethod,
      paymentDetails,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      note,
      referralCode: cart.referralCode || null,
    });
    
    const createdOrder = await order.save();
    
    // Update product stock
    for (const item of cart.items) {
      const product = await Product.findById(item.product);
      product.stock -= item.quantity;
      await product.save();
    }
    
    // Add loyalty points (1 point per 10,000 VND spent)
    const pointsEarned = Math.floor(totalPrice / 10000);
    
    if (pointsEarned > 0) {
      // Add points to user
      const user = await User.findById(req.user._id);
      user.points += pointsEarned;
      await user.save();
      
      // Create loyalty record
      await Loyalty.create({
        user: req.user._id,
        points: pointsEarned,
        type: 'earned',
        description: `Earned from order #${createdOrder._id}`,
        order: createdOrder._id,
      });
    }
    
    // Handle affiliate commission if referral code was used
    if (cart.referralCode) {
      const referrer = await User.findOne({ referralCode: cart.referralCode });
      
      if (referrer && referrer.isAffiliate) {
        const commission = calculateCommission(totalPrice);
        
        // Find or create affiliate record
        let affiliate = await Affiliate.findOne({ user: referrer._id });
        
        if (!affiliate) {
          affiliate = new Affiliate({ user: referrer._id });
        }
        
        // Add commission
        affiliate.totalCommission += commission;
        affiliate.availableCommission += commission;
        
        // Add order to affiliate orders
        affiliate.orders.push({
          order: createdOrder._id,
          commission,
          status: 'pending',
        });
        
        await affiliate.save();
        
        // Update order with affiliate info
        createdOrder.affiliateUser = referrer._id;
        createdOrder.affiliateCommission = commission;
        await createdOrder.save();
      }
    }
    
    // Clear cart
    cart.items = [];
    cart.referralCode = '';
    await cart.save();
    
    res.status(201).json(createdOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Check if order belongs to user or user is admin
    if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    order.status = status;
    
    if (status === 'completed') {
      order.deliveredAt = Date.now();
      
      // If order has affiliate, approve commission
      if (order.affiliateUser) {
        const affiliate = await Affiliate.findOne({ user: order.affiliateUser });
        
        if (affiliate) {
          const orderCommission = affiliate.orders.find(
            o => o.order.toString() === order._id.toString()
          );
          
          if (orderCommission) {
            orderCommission.status = 'approved';
            await affiliate.save();
          }
        }
      }
    }
    
    const updatedOrder = await order.save();
    
    res.json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer?.email_address,
    };
    
    const updatedOrder = await order.save();
    
    res.json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get all orders (admin)
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'id name');
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createOrder,
  getOrderById,
  updateOrderStatus,
  updateOrderToPaid,
  getOrders,
};
