import express from 'express';
import {
  getProductById,
  getAllProducts,
  addProduct,
  removeProductById
} from '../controllers/product-controller';
import checkToken from '../middlewares/auth-middleware';

const router = express.Router();

router.use(checkToken);

router.get('/', (req, res) => {
  getAllProducts()
    .then(products => res.json(products))
    .catch(error => res.status(500).json(error));
});

router.get('/:id', (req, res) => {
  getProductById(req.params.id)
    .then(product => res.json(product))
    .catch(error => res.status(500).json(error));
});

router.get('/:id/reviews', (req, res) => {
  getProductById(req.params.id)
    .then(product => res.json(product.get('reviews')))
    .catch(error => res.status(500).json(error));
});

router.post('/', (req, res) => {
  const newProduct = req.body;
  addProduct(newProduct)
    .then(product => res.json(product))
    .catch(error => res.status(500).json(error));
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  removeProductById(id)
    .then(() => res.json({ message: `product with id ${id} is deleted` }))
    .catch(error => res.status(500).json(error));
});

export default router;
