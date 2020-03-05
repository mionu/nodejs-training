import fs from 'fs';
import { PATH_TO_PRODUCTS } from '../constants/product-constants';

function getProductById(id) {
  return new Promise((resolve, reject) => {
    fs.readFile(PATH_TO_PRODUCTS, { encoding: 'utf8' }, (error, products) => {
      if (error) {
        reject(error);
      }
      const product = JSON.parse(products).find(p => p.id === id);
      product ? resolve(product) : reject({ error: `product with id ${id} is not found` });
    });
  });
}

function getAllProducts() {
  return new Promise((resolve, reject) => {
    fs.readFile(PATH_TO_PRODUCTS, { encoding: 'utf8' }, (error, products) => {
      if (error) {
        reject(error);
      }
      resolve(JSON.parse(products));
    });
  })
}

export { getProductById, getAllProducts };
