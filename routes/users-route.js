import express from 'express';
import fs from 'fs';
import { PATH_TO_USERS } from '../constants/user-constants';
import checkToken from '../middlewares/auth-middleware';

const router = express.Router();

router.use(checkToken);

router.get('/', (req, res) => {
  fs.createReadStream(PATH_TO_USERS).pipe(res);
});

export default router;
