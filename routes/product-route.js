import express from 'express';
import fs from 'fs';
import { getProductById, getAllProducts } from '../helpers/product-helpers';
import { PATH_TO_PRODUCTS } from '../constants/product-constants';

const router = express.Router();

router.get('/api/products', (req, res) => {
  fs.createReadStream(PATH_TO_PRODUCTS).pipe(res);
});

router.get('/api/products/:id', (req, res) => {
  getProductById(req.params.id)
  .then(product => res.json(product))
  .catch(err => res.status(404).json(err));
});

router.get('/api/products/:id/reviews', (req, res) => {
  getProductById(req.params.id)
  .then(product => res.json(product.reviews))
  .catch(err => res.status(404).json(err));
});

router.post('/api/products', (req, res) => {
  const newProduct = req.body;
  getAllProducts().then(products => {
    const product = products.find(p => p.id === newProduct.id);
    if (product) {
      res.json({ error: `product with id ${newProduct.id} already exists` });
    } else {
      products.push(newProduct);
      fs.writeFile(PATH_TO_PRODUCTS, JSON.stringify(products));
      res.json(newProduct);
    }
  })
  .catch(err => res.status(404).json(err));
})

export default router;
