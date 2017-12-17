import { User } from '../models';

function getAllUsers() {
  return User.find({});
}

function getSingleUser(criteria) {
  return User.findOne(criteria);
}

function removeUserById(id) {
  return User.findByIdAndRemove(id);
}

export {
  getAllUsers,
  getSingleUser,
  removeUserById
};
