import express from 'express';
import checkToken from '../middlewares/auth-middleware';
import { getAllUsers } from '../controllers/user-controller';

const router = express.Router();

router.use(checkToken);

router.get('/', (req, res) => {
  getAllUsers()
    .then(users => res.json(users))
    .catch(error => res.status(404).json(error));
});

export default router;
