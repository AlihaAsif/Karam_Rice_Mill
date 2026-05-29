import express from 'express';
import { loginAdmin, seedAdmin } from '../controllers/adminController.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.post('/seed', seedAdmin);

export default router;
