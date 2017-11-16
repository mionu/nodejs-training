'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      password: 'johndoe'
    }, {
      firstName: 'Jane',
      lastName: 'Doe',
      username: 'janedoe',
      password: 'janedoe'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
