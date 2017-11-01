import cookie from 'cookie';

export default function (req, res, next) {
  const cookies = req.headers.cookie;
  req.parsedCookies = cookie.parse(cookies);
  next();
}
