import cookie from 'cookie';

export default function (req, res, next) {
  const cookies = req.headers.cookie;
  if (cookies && !req.parsedCookies) {
    req.parsedCookies = cookie.parse(cookies);
  }
  next();
}
