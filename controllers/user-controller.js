import { User } from '../models';

function getAllUsers() {
  return User.find({});
}

function getSingleUser(criteria) {
  return User.findOne(criteria);
}

export { getAllUsers, getSingleUser };
