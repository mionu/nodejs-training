import { product } from '../models';

function findAll() {
  return product.findAll();
}

function findById(id) {
  return product.findById(id)
  .then(product => {
    return product || Promise.reject({ error: `no product with id ${id} found` });
  });
}

function addProduct(newProduct) {
  const { id } = newProduct;
  return product.findOrCreate({ where: { id }, defaults: newProduct })
  .then(([product, created]) => {
    if (!created) {
      return Promise.reject({ error: `product with id ${id} already exists` })
    }
    return product;
  });
}

export {
  findAll,
  findById,
  addProduct
};
