import { Product } from '../models';
import { isEmpty } from 'lodash';

function getProductById(id) {
  return Product.findById(id).then(product => {
    return isEmpty(product) ? Promise.reject({ error: `product with id ${id} is not found` }) :
      product;
  });
}

function getAllProducts() {
  return Product.find({});
}

function addProduct(newProduct) {
  const productDoc = new Product(newProduct);
  return productDoc.save();
}

function removeProductById(id) {
  return Product.findByIdAndRemove(id);
}

export {
  getProductById,
  getAllProducts,
  addProduct,
  removeProductById
};
