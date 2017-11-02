import express from 'express';
import fs from 'fs';

const router = express.Router();

router.get('/api/products', (req, res) => {
  fs.createReadStream('./bin/products.json').pipe(res);
});

router.get('/api/products/:id', (req, res) => {
  fs.readFile('./bin/products.json', { encoding: 'utf8' }, (err, products) => {
    if (err) {
      throw err;
    }
    const product = JSON.parse(products).find(p => p.id === req.params.id);
    res.json(product);
  });
});

router.get('/api/products/:id/reviews', (req, res) => {
  fs.readFile('./bin/products.json', { encoding: 'utf8' }, (err, products) => {
    if (err) {
      throw err;
    }
    const product = JSON.parse(products).find(p => p.id === req.params.id);
    res.json(product.reviews);
  });
});

router.post('/api/products', (req, res) => {
  const newProduct = req.body;
  console.log(req.body);
  fs.readFile('./bin/products.json', { encoding: 'utf8' }, (err, products) => {
    if (err) {
      throw err;
    }
    const productsArray = JSON.parse(products);
    productsArray.push(newProduct);
    fs.writeFile('./bin/products.json', JSON.stringify(productsArray));
  });
  res.json(newProduct);
})

export default router;
