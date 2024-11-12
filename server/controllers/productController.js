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
    const results = await scrape(query);
    console.log('Scraped results:', JSON.stringify(results, null, 2));
    if (results.length === 0) {
      return next(new ApiError(404, 'No products found'));
    }
    const savedProducts = [];
    for (const result of results) {
      console.log(`Website: ${result.website}`);
      for (const product of result.products) {
        console.log(`Saving product: ${JSON.stringify(product, null, 2)}`);
        const newProduct = new Product({
          query: query,
          title: product.title,
          price: product.price,
          link: product.link,
          description: product.description,
          imageUrl: product.imageUrl,
          site: result.website,
        });

        try {
          const savedProduct = await newProduct.save();
          console.log(`Product saved: ${savedProduct.title}`);
          savedProducts.push(savedProduct);
        } catch (dbError) {
          console.error('Error saving product:', dbError);
        }
      }
    }
    return res.status(200).json(new ApiResponse(savedProducts, 'Scraping and saving successful'));
    
  } catch (error) {
    console.error('Error during scraping:', error);
    return next(new ApiError(500, 'Failed to scrape and save data'));
  }
});
