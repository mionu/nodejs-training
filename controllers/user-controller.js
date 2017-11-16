import { user } from '../models';

function findAll() {
  return user.findAll();
}

function findOne(criteria) {
  return user.findOne(criteria)
  .then(user => {
    return user || Promise.reject({ error: `no such user found` });
  });
}

export {
  findAll,
  findOne
};
