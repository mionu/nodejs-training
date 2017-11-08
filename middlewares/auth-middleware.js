import jwt from 'jsonwebtoken';
import { SECRET } from '../constants/auth-constants';

export default function(req, res, next) {
  const token = req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) {
        res.json(err);
      }
      else {
        next();
      }
    })
  }
  else {
    res.status(403).json({ error: 'no auth token provided' });
  }
}
