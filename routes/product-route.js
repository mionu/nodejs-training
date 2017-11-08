import express from 'express';
import fs from 'fs';
import { getProductById, getAllProducts } from '../helpers/product-helpers';
import { PATH_TO_PRODUCTS } from '../constants/product-constants';
import checkToken from '../middlewares/auth-middleware';

const router = express.Router();

router.use(checkToken);

router.get('/api/products', (req, res) => {
  fs.createReadStream(PATH_TO_PRODUCTS).pipe(res);
});

router.get('/api/products/:id', (req, res) => {
  getProductById(req.params.id)
  .then(product => res.json(product))
  .catch(error => res.status(404).json(error));
});

router.get('/api/products/:id/reviews', (req, res) => {
  getProductById(req.params.id)
  .then(product => res.json(product.reviews))
  .catch(error => res.status(404).json(error));
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
  .catch(error => res.status(404).json(error));
})

export default router;
