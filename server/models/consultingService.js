import mongoose from 'mongoose';

const consultingServiceSchema = new mongoose.Schema({
ServiceProvider: { type: String, required: true },
  Domain: { type: String, required: true },
  ServiceOffered: { type: String, required: true },
  PricingStructure: { type: String, required: true },
  EstimatedCost: { type: String, required: true },
  Availability: { type: String, required: true },
  ClientIndustryFocus: { type: String, required: true },
  ExperienceExpertiseLevel: { type: String, required: true },
  ContactInformation: { type: String, required: true },
  Website: { type: String, required: true },
}, { timestamps: true });

const ConsultingService = mongoose.model('ConsultingService', consultingServiceSchema);

export default ConsultingService;
