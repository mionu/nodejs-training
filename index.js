const conf = require('./config/config');
const { User, Product } = require('./models');

console.log(conf.name);
new User();
new Product();