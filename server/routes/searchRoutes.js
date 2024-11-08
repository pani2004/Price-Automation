import express from 'express';
import { fetchAndStoreSearchResults, getStoredResults } from '../controllers/searchController.js';

const router = express.Router();

router.get('/search', fetchAndStoreSearchResults);
router.get('/search/stored', getStoredResults);

export default router;
