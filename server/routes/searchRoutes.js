import express from 'express';
import { scrapeController} from '../controllers/scrapeController.js';
import { scrapeController1 } from '../controllers/productController.js';

const router = express.Router();

router.post('/search', scrapeController);
router.post('/specification',scrapeController1);
export default router;
