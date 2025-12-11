const Review = require('../models/Review');
const Product = require('../models/Product');
const { analyzeReviewSentiment, generateSentimentSummary } = require('../ai/sentimentAnalysis');

const createReview = async (req, res) => {
  try {
    const { productId, userId, userName, rating, comment } = req.body;

    if (!productId || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message: 'Product ID, rating, and comment are required'
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5'
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const sentimentResult = await analyzeReviewSentiment(comment);

    const review = new Review({
      productId,
      userId: userId || null,
      userName: userName || 'Anonymous',
      rating,
      comment: comment.trim(),
      sentiment: sentimentResult.sentiment,
      sentimentScore: sentimentResult.sentimentScore,
      isActive: true
    });

    await review.save();

    const reviews = await Review.find({ productId, isActive: true });
    const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = totalRating / reviews.length;

    await Product.findByIdAndUpdate(productId, {
      rating: Math.round(averageRating * 10) / 10,
      reviewsCount: reviews.length
    });

    res.status(201).json({
      success: true,
      data: {
        review: {
          _id: review._id,
          productId: review.productId,
          userName: review.userName,
          rating: review.rating,
          comment: review.comment,
          sentiment: review.sentiment,
          sentimentScore: review.sentimentScore,
          createdAt: review.createdAt
        }
      }
    });

  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating review',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const { page = 1, limit = 10, sentiment } = req.query;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: 'Product ID is required'
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const query = {
      productId,
      isActive: true
    };

    if (sentiment && ['positive', 'negative', 'neutral'].includes(sentiment)) {
      query.sentiment = sentiment;
    }

    const reviews = await Review.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .select('userName rating comment sentiment sentimentScore createdAt');

    const total = await Review.countDocuments(query);

    res.status(200).json({
      success: true,
      data: {
        reviews,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          pages: Math.ceil(total / limitNum)
        }
      }
    });

  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching reviews',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

const getSentimentSummary = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: 'Product ID is required'
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const reviews = await Review.find({
      productId,
      isActive: true
    }).select('comment sentiment sentimentScore rating');

    if (reviews.length === 0) {
      return res.status(200).json({
        success: true,
        data: {
          summary: 'No reviews available for this product yet.',
          statistics: {
            total: 0,
            positive: 0,
            negative: 0,
            neutral: 0,
            averageRating: 0,
            averageSentimentScore: 0
          }
        }
      });
    }

    const positiveCount = reviews.filter(r => r.sentiment === 'positive').length;
    const negativeCount = reviews.filter(r => r.sentiment === 'negative').length;
    const neutralCount = reviews.filter(r => r.sentiment === 'neutral').length;
    const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = totalRating / reviews.length;
    const totalSentimentScore = reviews.reduce((sum, r) => sum + (r.sentimentScore || 0.5), 0);
    const averageSentimentScore = totalSentimentScore / reviews.length;

    const summary = await generateSentimentSummary(reviews);

    res.status(200).json({
      success: true,
      data: {
        summary,
        statistics: {
          total: reviews.length,
          positive: positiveCount,
          negative: negativeCount,
          neutral: neutralCount,
          averageRating: Math.round(averageRating * 10) / 10,
          averageSentimentScore: Math.round(averageSentimentScore * 100) / 100
        }
      }
    });

  } catch (error) {
    console.error('Get sentiment summary error:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating sentiment summary',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

const getReviewSentiment = async (req, res) => {
  try {
    const { reviewId } = req.params;

    if (!reviewId) {
      return res.status(400).json({
        success: false,
        message: 'Review ID is required'
      });
    }

    const review = await Review.findById(reviewId).select('sentiment sentimentScore sentimentInsights comment');

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        sentiment: review.sentiment,
        sentimentScore: review.sentimentScore,
        sentimentInsights: review.sentimentInsights,
        comment: review.comment
      }
    });

  } catch (error) {
    console.error('Get review sentiment error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching review sentiment',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

module.exports = {
  createReview,
  getProductReviews,
  getSentimentSummary,
  getReviewSentiment
};

