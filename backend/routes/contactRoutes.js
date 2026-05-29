import express from 'express';
import { submitMessage, getMessages, updateMessageStatus } from '../controllers/contactController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(submitMessage)
  .get(protectAdmin, getMessages);

router.route('/:id')
  .put(protectAdmin, updateMessageStatus);

export default router;
