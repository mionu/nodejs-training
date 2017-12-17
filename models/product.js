import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
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
  },
  lastModifiedDate: Date
});

schema.pre('save', function(next) {
  this.lastModifiedDate = Date.now();
  next();
});

export default mongoose.model('Product', schema);
