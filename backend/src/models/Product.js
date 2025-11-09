// Product Model for Search Functionality
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    index: true // Index for faster search
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    trim: true,
    index: true // Index for category filtering
  },
  brand: {
    type: String,
    trim: true,
    index: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  image: {
    type: String,
    default: ''
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewsCount: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Text index for full-text search on name, description, and tags
productSchema.index({ 
  name: 'text', 
  description: 'text', 
  tags: 'text',
  category: 'text',
  brand: 'text'
});

// Compound index for common query patterns
productSchema.index({ category: 1, price: 1 });
productSchema.index({ isActive: 1, category: 1 });

module.exports = mongoose.model('Product', productSchema);

