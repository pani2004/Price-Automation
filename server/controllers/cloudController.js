import CloudInfrastructure from '../models/CloudInfrastructure.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
const cloudData = {
  region: "Southeast Asia",
  cloud_providers: [
    {
      provider: "AWS",
      services: [
        { category: "Compute", service_name: "EC2 m5.large", pricing_unit: "per hour", price: 0.096, link: "https://aws.amazon.com/ec2/pricing/" },
        { category: "GPU", service_name: "EC2 g4dn.xlarge", pricing_unit: "per hour", price: 0.526, link: "https://aws.amazon.com/ec2/instance-types/g4/" },
        { category: "Storage", service_name: "S3 Standard", pricing_unit: "per GB per month", price: 0.023, link: "https://aws.amazon.com/s3/pricing/" }
      ]
    },
    {
      provider: "Google Cloud Platform",
      services: [
        { category: "Compute", service_name: "e2-standard-4", pricing_unit: "per hour", price: 0.134, link: "https://cloud.google.com/compute/all-pricing" },
        { category: "Storage", service_name: "Cloud Storage Standard", pricing_unit: "per GB per month", price: 0.020, link: "https://cloud.google.com/storage/pricing" },
        { category: "GPU", service_name: "Nvidia T4", pricing_unit: "per hour", price: 0.35, link: "https://cloud.google.com/gpu-pricing" }
      ]
    },
    {
      provider: "Microsoft Azure",
      services: [
        { category: "Compute", service_name: "D2_v5", pricing_unit: "per hour", price: 0.096, link: "https://azure.microsoft.com/en-us/pricing/details/virtual-machines/linux/" },
        { category: "GPU", service_name: "NCas_T4_v3", pricing_unit: "per hour", price: 0.90, link: "https://azure.microsoft.com/en-us/pricing/details/virtual-machines/linux/" },
        { category: "Storage", service_name: "Blob Storage (Hot Tier)", pricing_unit: "per GB per month", price: 0.0184, link: "https://azure.microsoft.com/en-us/pricing/details/storage/blobs/" }
      ]
    },
    {
      provider: "Singtel Nxera & Nscale",
      services: [
        { category: "GPU", service_name: "GPU-as-a-Service", pricing_unit: "varies", price: "Contact for pricing", link: "https://www.singtel.com/business/products-services/cloud" }
      ]
    },
    {
      provider: "Alibaba Cloud",
      services: [
        { category: "Compute", service_name: "ecs.g6.large", pricing_unit: "per hour", price: 0.057, link: "https://www.alibabacloud.com/product/ecs/pricing" },
        { category: "Storage", service_name: "Object Storage Service", pricing_unit: "per GB per month", price: 0.021, link: "https://www.alibabacloud.com/product/oss/pricing" },
        { category: "GPU", service_name: "V100", pricing_unit: "per hour", price: 2.00, link: "https://www.alibabacloud.com/product/gpu/pricing" }
      ]
    }
  ]
};
export const seedCloudData = asyncHandler(async (req, res, next) => {
  try {
    const existingData = await CloudInfrastructure.findOne({ region: cloudData.region });
    if (existingData) {
      return res.status(200).json(new ApiResponse(200, existingData, 'Data already exists.'));
    }
    const savedData = await CloudInfrastructure.create(cloudData);
    res.status(201).json(new ApiResponse(201, savedData, 'Cloud data seeded successfully.'));
  } catch (error) {
    next(new ApiError(500, 'Failed to seed data.'));
  }
});
export const getCloudData = asyncHandler(async (req, res, next) => {
  try {
    const data = await CloudInfrastructure.find({});
    res.status(200).json(new ApiResponse(200, data, 'Cloud data fetched successfully.'));
  } catch (error) {
    next(new ApiError(500, 'Failed to fetch data.'));
  }
});
