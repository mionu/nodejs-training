import mongoose, { Schema } from 'mongoose';

export default mongoose.model('Product', new Schema({
  name: {
    type: String,
    required: true
  },
  brand: String,
  company: String,
  price: {
    type: Number,
    min: [0, 'price can\'t be negative' ],
    required: true
  },
  isbn: {
    type: String,
    required: true
  }
}));
