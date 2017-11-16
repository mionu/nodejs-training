'use strict';
const fs = require('fs');
const path = require('path');
const csvjson = require('csvjson');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const data = fs.readFileSync('bin/MOCK_DATA.csv', { encoding: 'utf8' });
    const mappedProducts = csvjson.toObject(data).map(item => {
      delete item.id;
      return item;
    })
    return queryInterface.bulkInsert('products', mappedProducts, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('products', null, {});
  }
};
