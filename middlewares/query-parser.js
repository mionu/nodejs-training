export default function (req, res, next) {
  req.parsedQuery = req.query;
  next();
}
