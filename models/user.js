import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  firstName: String,
  lastName: String,
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  lastModifiedDate: Date
});

schema.pre('save', function(next) {
  this.lastModifiedDate = Date.now();
  next();
});

export default mongoose.model('User', schema);
