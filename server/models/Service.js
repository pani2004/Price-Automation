import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  siteLink: {
    type: String,
    required: true,
  },
});

const Service = mongoose.model('Service', serviceSchema);

export default Service;
