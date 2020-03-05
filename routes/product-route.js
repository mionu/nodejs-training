import express from 'express';
import { getProductById, getAllProducts } from '../helpers/product-helpers';
import checkToken from '../middlewares/auth-middleware';
import * as controller from '../controllers/product-controller';

const router = express.Router();

router.use(checkToken);

router.get('/', (req, res) => {
  controller.findAll()
  .then(products => res.json(products))
  .catch(error => res.status(400).json(error));
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  controller.findById(id)
  .then(product => res.json(product))
  .catch(error => res.status(400).json(error));
});

router.get('/:id/reviews', (req, res) => {
  const { id } = req.params;
  controller.findById(id)
  .then(product => res.json(product.reviews))
  .catch(error => res.status(400).json(error));
});

router.post('/', (req, res) => {
  const newProduct = req.body;
  controller.addProduct(newProduct)
  .then(product => res.json(product))
  .catch(error => res.status(404).json(error));
});

export default router;
