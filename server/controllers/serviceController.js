import { asyncHandler } from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js'; 
import CloudInfrastructure from '../models/CloudInfrastructure.js';
import ConsultingService from '../models/consultingService.js';
import Service from '../models/Service.js';
import VehicleService from '../models/Vehicle.js';
export const getServiceData = asyncHandler(async (req, res, next) => {
  const { serviceType } = req.params;

  try {  
    let data;
    switch (serviceType) {
      case 'cloudservice':
        data = await CloudInfrastructure.find({});
        if (!data.length) throw new ApiError(404, 'No cloud service data found');
        break;

      case 'consultingservices':
        data = await ConsultingService.find({});
        if (!data.length) throw new ApiError(404, 'No consulting services found');
        break;

      case 'security':
        data = await Service.find({});
        if (!data.length) throw new ApiError(404, 'No security services found');
        break;

      case 'cleaning': 
        data = [];
        if (!data.length) throw new ApiError(404, 'No cleaning services found');
        break;
        case 'vehicle':
          data = await VehicleService.find({});
          if (!data.length) throw new ApiError(404, 'No vehicle services found');
          break;

      default:
        throw new ApiError(400, 'Invalid service type');
    }

    return res
      .status(200)
      .json(new ApiResponse(200, data, `${serviceType} data fetched successfully`));
  } catch (error) {
    if (error instanceof ApiError) return next(error);
    return next(new ApiError(500, 'Failed to fetch service data'));
  }
});
