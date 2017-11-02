import express from 'express';
import fs from 'fs';

const router = express.Router();

router.get('/api/users', (req, res) => {
  fs.createReadStream('./bin/users.json').pipe(res);
});

export default router;
