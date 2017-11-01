import app from './app';
import cookieParser from './middlewares/cookie-parser';
import queryParser from './middlewares/query-parser';
const port = process.env.PORT || 8080;

app.use(cookieParser);
app.use(queryParser);

app.use((req, res, next) => {
  console.log(req.parsedCookies);
  console.log(req.parsedQuery);
  next();
})

app.listen(port, () => console.log(`App listening on port ${port}!`));
