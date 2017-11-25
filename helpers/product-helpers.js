import { Product } from '../models';
import { isEmpty } from 'lodash';
import { Promise } from 'mongoose';

function getProductById(id) {
  return Product.findById(id).then(product => {
    return isEmpty(product) ? Promise.reject({ error: `product with id ${id} is not found` }) :
      product;
  });
}

function getAllProducts() {
  return Product.find({});
  // return new Promise((resolve, reject) => {
  //   Product.find({}, (error, products) => {
  //     if (error) {
  //       reject({ error });
  //     }
  //     resolve(products);
  //   });
  // })
}

function addProduct(newProduct) {
  return new Promise((resolve, reject) => {
    // const productDoc = new Product(newProduct);
    // productDoc.save((error, product) => {
    //   console.log(`!!!!!!!!!!!!!!!!!!!!${error} ${product}`);
    //   if (error) {
    //     reject(error);
    //   }
    //   resolve(product);
    // });
  });
}

export { getProductById, getAllProducts, addProduct };
