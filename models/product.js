import mongoose, { Schema } from 'mongoose';

export default mongoose.model('Product', new Schema({
  name: String,
  brand: String,
  company: String,
  price: Number,
  isbn: String
}));
