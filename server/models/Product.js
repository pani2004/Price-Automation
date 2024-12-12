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
  rating:{
    type:String,
    default: 'No rating provided'
  },
  link: {
    type: String,
  },
  site: {
    type: String,
    required: false,
  },
  timestamp: { type: String, required: true }
});

const Product = mongoose.model('Product', productSchema);
export default Product;
