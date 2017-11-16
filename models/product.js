'use strict';
module.exports = (sequelize, DataTypes) => {
  var product = sequelize.define('product', {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    company: DataTypes.STRING,
    price: DataTypes.STRING,
    isbn: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return product;
};
