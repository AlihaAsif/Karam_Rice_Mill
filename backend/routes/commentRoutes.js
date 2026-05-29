import express from 'express';
import {
  submitComment,
  getComments,
  getCommentsByNews,
  updateCommentStatus,
  deleteComment
} from '../controllers/commentController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(submitComment)
  .get(protectAdmin, getComments); // Admin: get all comments

router.route('/news/:slug')
  .get(getCommentsByNews); // Public: get approved comments for a news article

router.route('/:id')
  .put(protectAdmin, updateCommentStatus)   // Admin: approve/reject
  .delete(protectAdmin, deleteComment);     // Admin: delete

export default router;
