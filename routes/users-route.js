import express from 'express';
import fs from 'fs';
import { PATH_TO_USERS } from '../constants/user-constants';

const router = express.Router();

router.get('/api/users', (req, res) => {
  fs.createReadStream(PATH_TO_USERS).pipe(res);
});

export default router;
