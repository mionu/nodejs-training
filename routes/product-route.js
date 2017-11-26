import express from 'express';
import fs from 'fs';
import { getProductById, getAllProducts, addProduct } from '../controllers/product-controller';
import checkToken from '../middlewares/auth-middleware';

const router = express.Router();

router.use(checkToken);

router.get('/', (req, res) => {
  getAllProducts()
    .then(products => res.json(products))
    .catch(error => res.status(404).json(error));
});

router.get('/:id', (req, res) => {
  getProductById(req.params.id)
    .then(product => res.json(product))
    .catch(error => res.status(404).json(error));
});

router.get('/:id/reviews', (req, res) => {
  getProductById(req.params.id)
    .then(product => res.json(product.get('reviews')))
    .catch(error => res.status(404).json(error));
});

router.post('/', (req, res) => {
  const newProduct = req.body;
  addProduct(newProduct)
    .then(product => res.json(product))
    .catch(error => res.status(404).json(error));
})

export default router;
