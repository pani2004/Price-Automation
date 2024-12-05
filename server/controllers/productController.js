import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import { asyncHandler } from "../utils/asyncHandler.js";
import { scrape } from "../utils/scrape.js";
import Product from '../models/Product.js';  

export const scrapeController = asyncHandler(async (req, res, next) => {
  const { query } = req.query;
  if (!query) {
    return next(new ApiError(400, 'Query parameter is required'));
  }
  try {
    console.log(`Received request to scrape for query: "${query}"`);
    const existingProducts = await Product.find({ query });
    if (existingProducts.length > 0) {
      return res.status(200).json(new ApiResponse(200, existingProducts, 'Products found in the database'));
    }
    const results = await scrape(query);
    console.log('Scraping results:', results);

    if (results.length === 0) {
      return next(new ApiError(404, 'No products found'));
    }
    const productsToSave = [];

    for (const result of results) {
      const products = Array.isArray(result.products) ? result.products : [result.products];
      products.forEach(product => {
        productsToSave.push({
          query: query,
          title: product.title,
          price: product.price,
          link: product.link,
          description: product.description || '', 
          imageUrl: product.imageUrl || '',      
          site: result.website,
          timestamp: new Date(),
        });
      });
    }
    if (productsToSave.length > 0) {
      try {
        await Product.bulkWrite(
          productsToSave.map(product => ({
            updateOne: {
              filter: { link: product.link },
              update: { $setOnInsert: product },
              upsert: true,
            }
          }))
        );
      } catch (dbError) {
        console.error('Error saving products:', dbError);
        return next(new ApiError(500, 'Failed to save products'));
      }
    }
    const savedProducts = await Product.find({ query }).sort({ timestamp: -1 });
    console.log('Saved products:', savedProducts);

    return res.status(200).json(new ApiResponse(200, savedProducts, 'Scraping and saving successful'));

  } catch (error) {
    console.error('Error during scraping:', error);
    return next(new ApiError(500, 'Failed to scrape and save data'));
  }
});
