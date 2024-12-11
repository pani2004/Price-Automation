import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import Product from '../models/Product.js';
import redisClient from '../utils/redis.js'; 
import { scrapeHardware } from '../services/scrapeService.js';

export const scrapeController = asyncHandler(async (req, res, next) => {
  const { query, category, make, model } = req.body;

  if (!query) return next(new ApiError(400, 'Query parameter is required'));
  if (!category) return next(new ApiError(400, 'Category parameter is required'));
  if (!make) return next(new ApiError(400, 'Make parameter is required'));
  if (!model) return next(new ApiError(400, 'Model parameter is required'));
  const cacheKey = `${query}:${category}:${make}:${model}`;
  try {
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      console.log('Cache hit');
      return res
        .status(200)
        .json(new ApiResponse(200, JSON.parse(cachedData), 'Products retrieved from cache'));
    }
    console.log('Cache miss');
    let scrapedResults;
    switch (category) {
      case 'it_hardware':
        scrapedResults = await scrapeHardware(query, make, model);
        break;
      default:
        return next(new ApiError(400, `Invalid category: "${category}"`));
    }

    if (!scrapedResults.length) {
      return next(new ApiError(404, `No products found for query: "${query}" in category: "${category}"`));
    }
    const productsToSave = scrapedResults.flatMap(({ website, products }) =>
      products.map((product) => ({
        query,
        make,
        model,
        title: product.title || null,
        price: product.price || null,
        link: product.link || null,
        description: product.description || null,
        imageUrl: product.imageUrl || null,
        site: website,
      }))
    );
    await Product.insertMany(productsToSave);
    await redisClient.set(cacheKey, JSON.stringify(productsToSave), { EX: 3600 });
    return res
      .status(200)
      .json(new ApiResponse(200, productsToSave, 'Products scraped and saved to database'));
  } catch (error) {
    console.error('Error during scraping or saving products:', error);
    return next(new ApiError(500, 'Failed to scrape or save products'));
  }
});

