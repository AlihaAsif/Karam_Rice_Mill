import express from 'express';
import {
  submitReview,
  getReviews,
  getReviewsByProduct,
  updateReviewStatus,
  deleteReview
} from '../controllers/reviewController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(submitReview)
  .get(protectAdmin, getReviews); // Admin: get all reviews

router.route('/product/:productId')
  .get(getReviewsByProduct); // Public: get approved reviews for a product

router.route('/:id')
  .put(protectAdmin, updateReviewStatus)   // Admin: approve/reject
  .delete(protectAdmin, deleteReview);     // Admin: delete

export default router;
