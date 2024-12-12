import express from 'express';
import { analyzeProduct } from '../controllers/analyticsController.js';

const router = express.Router();

router.post('/analyze', analyzeProduct);

export default router;