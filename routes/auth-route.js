import express from 'express';
import jwt from 'jsonwebtoken';
import { SECRET, email, username, password } from '../constants/auth-constants';

const router = express.Router();

router.post('/api/auth', (req, res) => {
  const user = req.body;
  if (user.username === username && user.password === password) {
    const payload = { email, username: user.username };
    const token = jwt.sign(payload, SECRET, { expiresIn: '1h' });
    res.status(200).json({
      message: 'OK',
      data: {
        user: payload
      },
      token
    });
  }
  else {
    res.status(404).json({
      'message': 'Not Found',
      'data': req.body
    });
  }
});

export default router;
