import express from 'express';
import { scrapeProducts } from '../controllers/googleController.js'; // Import the scraping controller

const router = express.Router();

// Route to scrape products
router.get('/scrape', scrapeProducts);
export default router;
