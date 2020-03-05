import express from 'express';
import checkToken from '../middlewares/auth-middleware';
import * as controller from '../controllers/user-controller';

const router = express.Router();

router.use(checkToken);

router.get('/', (req, res) => {
  controller.findAll()
  .then(users => res.json(users))
  .catch(error => res.status(400).json(error));
});

export default router;
