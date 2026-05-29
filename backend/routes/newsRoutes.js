import express from 'express';
import { getNews, getNewsById, createNews, updateNews, deleteNews } from '../controllers/newsController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getNews)
  .post(protectAdmin, createNews);

router.route('/:id')
  .get(getNewsById)
  .put(protectAdmin, updateNews)
  .delete(protectAdmin, deleteNews);

export default router;
