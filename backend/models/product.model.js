
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a product name'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Please add a product price'],
      min: [0, 'Price cannot be negative'],
    },
    description: {
      type: String,
      required: [true, 'Please add a product description'],
    },
    detailDescription: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      required: [true, 'Please add a product image'],
    },
    category: {
      type: String,
      required: [true, 'Please add a product category'],
    },
    weight: {
      type: String,
      required: [true, 'Please add product weight'],
    },
    stock: {
      type: Number,
      required: [true, 'Please add product stock'],
      min: [0, 'Stock cannot be negative'],
    },
    ingredients: {
      type: String,
      default: '',
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Create index for search functionality
productSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Product', productSchema);
