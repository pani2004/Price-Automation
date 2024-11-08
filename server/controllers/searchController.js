import axios from 'axios';
import {SearchResult} from '../models/SearchResult.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import { asyncHandler } from "../utils/asyncHandler.js"
import dotenv from 'dotenv';
dotenv.config();
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const cx = process.env.cx;                          
export const fetchAndStoreSearchResults = asyncHandler(async (req, res, next) => {
    const { query } = req.query;
    if (!query) {
      return next(new ApiError(400, "Query parameter is required"));
    }
    try {
      const cachedResults = await SearchResult.find({ query }).sort({ timestamp: -1 }).limit(10);
      console.log("Cached results found:", cachedResults);
      if (cachedResults.length > 0) {
        return res.status(200).json(new ApiResponse(200, cachedResults, "Fetched from database"));
      }
      const response = await axios.get(`https://www.googleapis.com/customsearch/v1`, {
        params: {
          key: GOOGLE_API_KEY,
          cx: cx,
          q: query,
        },
      });
      console.log("Google API response:", response.data);
      if (!response.data || !response.data.items) {
        throw new ApiError(502, "No items found in Google API response");
      }
      const results = response.data.items.map((item) => ({
        query,
        title: item.title,
        link: item.link,
        snippet: item.snippet,
        cacheId: item.cacheId,
        link:item.link
      }));
      console.log("Results to be stored:", results);  // Log results before storing
  
      await SearchResult.insertMany(results);
      res.status(200).json(new ApiResponse(200, results, "Fetched from Google API"));
    } catch (error) {
      console.error("Error in fetching or storing search results:", error);  // Log the error
      next(new ApiError(500, "Failed to fetch or store search results", [error.message]));
    }
  });
  

export const getStoredResults = asyncHandler(async (req, res, next) => {
  const { query } = req.query;

  try {
    const results = await SearchResult.find({ query }).sort({ timestamp: -1 }).limit(10);
    if (results.length === 0) {
      return next(new ApiError(404, "No stored results found for the query"));
    }
    res.status(200).json(new ApiResponse(200, results, "Stored results fetched successfully"));
  } catch (error) {
    next(new ApiError(500, "Failed to retrieve search results", [error.message]));
  }
});
