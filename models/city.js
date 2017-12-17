import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  capital: Boolean,
  location: {
    lat: {
      type: Number,
      min: [-90, 'can\'t be less than -90'],
      max: [90, 'can\'t be more than 90']
    },
    long: {
      type: Number,
      min: [0, 'can\'t be less than 0'],
      max: [180, 'can\'t be more than 180']
    }
  },
  lastModifiedDate: Date
});

schema.pre('save', function(next) {
  this.lastModifiedDate = Date.now();
  next();
});

schema.pre('findOneAndUpdate', function(next) {
  this.update({},{ $set: { lastModifiedDate: Date.now() } });
  next();
});

export default mongoose.model('City', schema);
