import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  query: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  price: {
    type: String,
    required: false, 
  },
  link: {
    type: String,
  },
  site: {
    type: String,
    required: false,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model('Product', productSchema);
export default Product;