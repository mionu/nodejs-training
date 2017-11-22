import mongoose, { Schema } from 'mongoose';

export default mongoose.model('User', new Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String
}));
