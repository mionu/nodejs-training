import express from 'express';
import checkToken from '../middlewares/auth-middleware';
import { getAllUsers, removeUserById } from '../controllers/user-controller';

const router = express.Router();

router.use(checkToken);

router.get('/', (req, res) => {
  getAllUsers()
    .then(users => res.json(users))
    .catch(error => res.status(500).json(error));
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  removeUserById(id)
    .then(() => res.json({ message: `user with id ${id} is deleted` }))
    .catch(error => res.status(500).json(error));
});

export default router;
