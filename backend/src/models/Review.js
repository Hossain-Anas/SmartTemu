const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
    index: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  userName: {
    type: String,
    trim: true,
    default: 'Anonymous'
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
    index: true
  },
  comment: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  sentiment: {
    type: String,
    enum: ['positive', 'negative', 'neutral'],
    default: null,
    index: true
  },
  sentimentScore: {
    type: Number,
    min: 0,
    max: 1,
    default: null
  },
  sentimentInsights: {
    type: String,
    default: null
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

reviewSchema.index({ productId: 1, isActive: 1 });
reviewSchema.index({ productId: 1, sentiment: 1 });
reviewSchema.index({ productId: 1, rating: 1 });

module.exports = mongoose.model('Review', reviewSchema);