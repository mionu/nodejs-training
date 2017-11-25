import mongoose, { Schema } from 'mongoose';

export default mongoose.model('User', new Schema({
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
  }
}));
