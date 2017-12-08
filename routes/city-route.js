import express from 'express';
import {
  getAllCities,
  addCity,
  removeCityById
} from '../controllers/city-controller';

const router = express.Router();

router.get('/', (req, res) => {
  getAllCities()
    .then(cities => res.json(cities))
    .catch(error => res.status(500).json(error));
});

router.post('/', (req, res) => {
  const newCity = req.body;
  addCity(newCity)
    .then(city => res.json(city))
    .catch(error => res.status(500).json(error));
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  removeCityById(id)
    .then(() => res.json({ message: `city with id ${id} is deleted` }))
    .catch(error => res.status(500).json(error));
});

export default router;
