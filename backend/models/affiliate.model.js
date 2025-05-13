
const mongoose = require('mongoose');

const withdrawalSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
      min: [1, 'Amount must be at least 1'],
    },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'approved', 'rejected', 'paid'],
      default: 'pending',
    },
    processedAt: {
      type: Date,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const affiliateSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    totalCommission: {
      type: Number,
      default: 0,
    },
    availableCommission: {
      type: Number,
      default: 0,
    },
    withdrawnCommission: {
      type: Number,
      default: 0,
    },
    orders: [
      {
        order: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Order',
        },
        commission: {
          type: Number,
          required: true,
        },
        status: {
          type: String,
          enum: ['pending', 'approved', 'rejected'],
          default: 'pending',
        },
      },
    ],
    withdrawals: [withdrawalSchema],
    bankInfo: {
      bankName: { type: String },
      accountNumber: { type: String },
      accountName: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Affiliate', affiliateSchema);
