import express from 'express';
import { scrapeController} from '../controllers/productController.js';

const router = express.Router();

router.get('/search', scrapeController);

export default router;
