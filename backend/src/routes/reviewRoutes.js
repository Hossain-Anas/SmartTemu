const express = require('express');
const router = express.Router();

const {
  createReview,
  getProductReviews,
  getSentimentSummary,
  getReviewSentiment
} = require('../controllers/reviewController');

router.post('/', createReview);
router.get('/product/:productId', getProductReviews);
router.get('/product/:productId/sentiment', getSentimentSummary);
router.get('/:reviewId/sentiment', getReviewSentiment);

module.exports = router;

