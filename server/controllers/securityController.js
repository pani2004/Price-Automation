import Service from '../models/Service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
const serviceData = [
  { name: 'Genius Security Service (Vadodara)', service: 'Security Guard', amount: 13352, siteLink: 'https://www.scribd.com/document/521303111/Genius-Security-Service-Quotation' },
  { name: 'Sky High Security & Manpower Services (UP)', service: 'Security Gun Man', amount: 19181, siteLink: 'https://5.imimg.com/data5/SELLER/Doc/2021/7/SX/MA/PI/115465851/security-services.pdf' },
  { name: 'OM Services', service: 'House Keeping Boys', amount: 4100, siteLink: 'https://www.scribd.com/doc/13005346/Om-Services-Quotation-doc' },
  {name:'7 Wings Security Services',service:'Semi Skilled Guard',amount:17600,siteLink:'https://www.slideshare.net/slideshow/7-wings-quotation-profile-a/68387128'},
  {name:'G4S',service:'House Boy',amount:8105,siteLink:'https://www.scribd.com/document/52000556/Revised-Quotation-from-G4S'}
];
export const seedServices = asyncHandler(async (req, res, next) => {
  try {
    const existingServices = await Service.find({});
    if (existingServices.length === 0) {
      await Service.insertMany(serviceData);
      return res.status(201).json(new ApiResponse(201, serviceData, 'Services seeded successfully'));
    }
    return res.status(200).json(new ApiResponse(200, existingServices, 'Services already exist in the database'));
  } catch (error) {
    console.log(error)
  }
});

// Fetch all services
export const getServices = asyncHandler(async (req, res, next) => {
  try {
    const services = await Service.find({});
    if (!services || services.length === 0) {
      return next(new ApiError(404, 'No services found'));
    }
    return res.status(200).json(new ApiResponse(200, services, 'Services fetched successfully'));
  } catch (error) {
    return next(new ApiError(500, 'Failed to fetch services'));
  }
});
