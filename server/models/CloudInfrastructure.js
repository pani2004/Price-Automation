import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
  category: String,
  service_name: String,
  pricing_unit: String,
  price: mongoose.Schema.Types.Mixed,
  link: String,
});

const ProviderSchema = new mongoose.Schema({
  provider: { type: String, required: true },
  services: [ServiceSchema],
});

const CloudInfrastructureSchema = new mongoose.Schema({
  region: { type: String, required: true },
  cloud_providers: [ProviderSchema],
}, { timestamps: true });

export default mongoose.model('CloudInfrastructure', CloudInfrastructureSchema);
