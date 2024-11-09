import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import { asyncHandler } from "../utils/asyncHandler.js";
import { scrape } from "../utils/scrape.js";  // Import the scraping logic from the scrape file
import Product from '../models/Product.js';  // Import the Product model

// Controller function to handle scraping request
export const scrapeController = asyncHandler(async (req, res, next) => {
  const { query } = req.query; // Extract query parameter from request

  if (!query) {
    return next(new ApiError(400, 'Query parameter is required'));
  }

  try {
    console.log(`Received request to scrape for query: "${query}"`);
    
    // Call the scrape function with the provided query
    const results = await scrape(query);

    // If no results, throw an error using ApiError
    if (results.length === 0) {
      return next(new ApiError(404, 'No products found'));
    }

    // Save the scraped results to the database
    const savedProducts = [];
    for (const result of results) {
      const product = new Product({
        query: query,  // Save the query used for scraping
        title: result.title,
        price: result.price,
        link: result.link,
        description: result.description,
        imageUrl: result.imageUrl,
        site: result.site,  // If the site information is available
      });

      const savedProduct = await product.save();  // Save to MongoDB
      savedProducts.push(savedProduct);  // Keep track of the saved products
    }

    // Return the response using ApiResponse
    return res.status(200).json(new ApiResponse(savedProducts, 'Scraping and saving successful'));
    
  } catch (error) {
    console.error('Error during scraping:', error);
    // Handle any unexpected errors with ApiError
    return next(new ApiError(500, 'Failed to scrape and save data'));
  }
});
