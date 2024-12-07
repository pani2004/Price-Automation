import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from '../utils/ApiError';
import ApiResponse from '../utils/ApiResponse';
import Product from '../models/ProductModel'; 
import { scrapeStationary, scrapeFurniture, scrapeVehicles, scrapeNetworkDevices } from '../services/scrapeService';

export const scrapeController = asyncHandler(async (req, res, next) => {
  const { query, category } = req.query;

  if (!query) {
    return next(new ApiError(400, 'Query parameter is required'));
  }
  if (!category) {
    return next(new ApiError(400, 'Category parameter is required'));
  }

  try {
    
    const dbProducts = await Product.find({ query, category });
    if (dbProducts.length) {
      return res.status(200).json(new ApiResponse(200, dbProducts, 'Products found in database'));
    }

    let scrapedResults;
    switch (category) {
      case 'stationary':
        scrapedResults = await scrapeStationary(query);
        break;
      case 'furniture':
        scrapedResults = await scrapeFurniture(query);
        break;
      case 'vehicles':
        scrapedResults = await scrapeVehicles(query);
        break;
      case 'networkDevices':
        scrapedResults = await scrapeNetworkDevices(query);
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
        title: product.title || null,
        price: product.price || null,
        link: product.link || null,
        description: product.description || null,
        imageUrl: product.imageUrl || null,
        site: website,
      }))
    );

    await Product.insertMany(productsToSave);

    return res.status(200).json(new ApiResponse(200, productsToSave, 'Products scraped and saved to database'));
  } catch (error) {
    console.error('Error during scraping or saving products:', error);
    return next(new ApiError(500, 'Failed to scrape or save products'));
  }
});
