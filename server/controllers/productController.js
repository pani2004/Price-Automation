import redisClient from '../utils/redis.js'; 
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import { asyncHandler } from "../utils/asyncHandler.js";
import { scrape } from "../services/scrape.js";
import Product from '../models/Product.js';

export const scrapeController1 = asyncHandler(async (req, res, next) => {
  const { query, details } = req.body;
  
  if (!query || !details) {
    return next(new ApiError(400, 'Query and details parameters are required'));
  }

  const validCategories = ['furniture', 'stationary', 'networkdevices', 'network devices', 'network'];
  const normalizedDetails = details.toLowerCase().replace(/\s+/g, '');
  if (!validCategories.map(category => category.replace(/\s+/g, '')).includes(normalizedDetails)) {
    return next(new ApiError(400, 'Invalid details parameter.'));
  }

  const cacheKey = `${query}:${normalizedDetails}`;

  try {
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      console.log('Cache hit');
      return res.status(200).json(new ApiResponse(200, {
        products: JSON.parse(cachedData),
        timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }).replace(",", ""),
      }, 'Data retrieved from cache'));
    }
    console.log('Cache miss');
    const results = await scrape(query, normalizedDetails);
    if (!results || results.length === 0) {
      return next(new ApiError(404, 'No products found during scraping'));
    }
    const productsToSave = results.flatMap(result =>
      (Array.isArray(result.products) ? result.products : [result.products]).map(product => ({
        query,
        details,
        title: product.title || 'No title provided',
        price: product.price || 'No price provided',
        link: product.link || 'No link provided',
        site: result.website,
        rating: product.rating || 'No rating provided',  // Add rating here
        timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }).replace(",", ""),
      }))
    );

    if (productsToSave.length > 0) {
      await Product.bulkWrite(
        productsToSave.map(product => ({
          updateOne: {
            filter: { link: product.link },
            update: { $setOnInsert: product },
            upsert: true,
          }
        }))
      );
    }

    await redisClient.set(cacheKey, JSON.stringify(productsToSave), { EX: 3600 });
    return res.status(200).json(new ApiResponse(200, {
      products: productsToSave,
      timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }).replace(",", ""),
    }, 'Scraping and saving successful'));
  } catch (error) {
    console.error('Error during scraping:', error);
    return next(new ApiError(500, 'Failed to scrape and save data'));
  }
});





