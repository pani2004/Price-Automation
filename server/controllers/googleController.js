import {scrape1}  from "../services/scrape1.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
/**
 * Controller to handle scraping requests.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
export const scrapeProducts = asyncHandler(async (req, res, next) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({
                success: false,
                message: 'Query is required.',
            });
        }

        const results = await scrape1(query);
        res.status(200).json(new ApiResponse(200, results, 'Scraping complete.'));
    } catch (error) {
        return next(new ApiError(500, 'Failed to scrape and save data'));
    }
});

